import { fetch } from 'whatwg-fetch';
import qs from 'qs';
import fetchJsonp from 'fetch-jsonp';
import isObject from 'lodash/isObject';
import { message } from 'antd';
import { api, isDev } from '@/utils';


// 统一设置csrf 和 csrf url地址
let hasCsrf = true;
let csrfUrl = `${api}/main/getToken`;

const log = (name = '', req = '', options = {}, res = {}) => {
  name = name ? `【${name}】数据` : '地址'
  console.group(`%c 请求${name}：${req}`, 'color:#009a61');
  console.log(`时间：${new Date().toLocaleString()}\n参数：`, options, '\n响应：', res);
  console.groupEnd();
}

let defaultOpts = {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
};

let defaultIntercept = {
  interceptRequest: (args) => args,
  interceptResponse: (args) => args
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  // if (/^5\d{2}/.test(response.status)) {
  //   router.push('/exception/500');
  // }

  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function createSecret() {
  return +new Date() + '-' + Math.floor(Math.random() * Math.pow(10, 18)).toString(16);
}

function stitchUrlParam(url, param) {
  if (!param) return url;

  let mark = url.indexOf('?') === -1 ? '?' : '&';
  return url + mark + param;
}

function requestJsonp(url, options = {}) {
  let body = options.body;

  if (isObject(body)) {
    body = qs.stringify(body) || '';
  }

  url = stitchUrlParam(url, body);

  delete options.dataType;
  delete options.body;

  let { interceptRequest, interceptResponse, ...opts } = options;

  return (
    new Promise((resolve) => {
      resolve(interceptRequest({ url, ...opts }))
    })
      .then(({ url, ...data }) => {
        return fetchJsonp(url, data)
          .then(parseJSON)
          .then(interceptResponse)
      })
  )

}

function goLogin(code) {
  if (code === -3) {
    message.error('未登录');
    // message.error('您还未登录，正在跳往登录页面');
    // if( isDev ){
    //   window.top.location.href = `http://web-casServer-vip/casServer/login?service=http://risktest.tf56.com/singleportStatic/#/reportManage/dashboard`;
    // }else{
    //   window.top.location.href = `http://passport1.tf56.lo/casServer/login?service=http://boss.tf56.lo/singleportStatic/#/reportManage/dashboard`;
    // }
    return
  }
}

function checkRes(url, options, data) {
  const { name, ...restOptions } = options;
  isDev && log(name, url, restOptions, data);
  
  goLogin(data.code);

  if (data.code !== 0) {
    data.msg && message.error(data.msg);
  }
  return data
}

function reuqestJson(url, options = {}) {
  let { interceptRequest, interceptResponse, ...opts } = options;

  return (
    new Promise((resolve) => {
      resolve(interceptRequest({ url, ...opts }))
    })
      .then(({ url, ...data }) => {
        return fetch(url, data)
          .then(checkStatus)
          .then(parseJSON)
          .then(res => checkRes(url, data, res))
          .then(interceptResponse)
      })
  )
}

export function setCsrfUrl(url) {
  csrfUrl = url;
}

export function setCsrf(tag) {
  hasCsrf = tag;
}

/**
 *
 * @param { String } url 请求地址
 * @param { Object }
 *   options : {
 *      body: [String, Object], 传给后端的参数
 *      dataType: 'jsonp',  后端返回的数据格式, 一般不传, 目前只支持传入jsonp
 *      type: '', 前端传给后端的数据格式, 一般不传, 默认form类型, 只支持传入json
 *      method: 'get/post',  请求类型
 *      hasCsrf: false/true,  是否需要先发csrf请求
 *      csrfUrl: String  设置csrf请求地址
 *   }
 *
 * ps: 如果是jsonp, options还支持参数: timeout, jsonpCallbackFunction, jsonpCallback等参数
 *     文档地址: https://www.npmjs.com/package/fetch-jsonp
 */
export function request(url, options = {}) {
  options = { ...defaultIntercept, ...options }

  // jsonp
  if ((options.dataType || '').toLowerCase() === 'jsonp') {
    return requestJsonp(url, options);
  }

  if (options.type === 'json') {
    options.headers = {
      // 'Content-Type': 'application/json;charset=UTF-8'
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }

    if (isObject(options.body)) {
      // options.body = JSON.stringify(options.body);
    }
  }

  if (isObject(options.body)) {
    options.body = qs.stringify(options.body) || '';
  }

  options = { ...defaultOpts, ...options };

  // get方式不能有body，所以拼接到url上
  if (options.method.toLowerCase() === 'get') {
    url = stitchUrlParam(url, options.body);
    delete options.body;
  }

  let { hasCsrf: optHasCsrf } = options;

  // 不需要csrf
  if (optHasCsrf === false || (optHasCsrf === undefined && !hasCsrf)) {
    return reuqestJson(url, options);
  }

  // let csrfType = createSecret();
  // console.log('options:',options);
  return fetch(options.csrfUrl || csrfUrl, Object.assign(
    {}, defaultOpts, {
      method: 'POST',
      // type:'json',
      // body: qs.stringify({
      //   csrfType, t: +new Date()
      // })
    }))
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      goLogin(data.code);

      if (data.code === 0 && data.data) {
        // url = stitchUrlParam(url, `csrfType=${csrfType}&csrfToken=${data.data}`);
        options.headers = {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'token' :data.data.token
        }
      }

      return reuqestJson(url, options);
    }
  );
}



