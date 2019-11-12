import axios from 'axios'
import { message } from 'antd';
import qs from 'qs'
// 是否是生产环境-因为生产环境唯一
// const isProductionEnv = location.host === 'v1.tf56.com'

// 创建axios
const service = axios.create({
    // baseURL: '/api/partyOpenApi',
    timeout: 30 * 1000,
})

// 拦截器
service.interceptors.request.use(config=>{
    console.log(config,'进入req拦截器')
    return config
},err=>{
    console.log(err)
    return Promise.reject(err)
})

service.interceptors.response.use(config=>{
    console.log(config,'进入res拦截器')
    return config
},err=>{
    console.log(err)
    message.error('数据获取失败')
    return Promise.reject(err)
})

// csrf
function createSecret() {
    return +new Date() + '-' + Math.floor(Math.random() * Math.pow(10, 18)).toString(16);
}

let csrfType = createSecret();

// Post
const requestPost = (url, data = {}, headers) => {
    
    return new Promise((resolve, reject) => {
        service({
            url,
            data,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8 ',
            },
            method: 'post',
        }).then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
      })
  
}

const requestFormPost = (url, data = {}, headers) => {
    
    return new Promise((resolve, reject) => {
        service({
            url,
            data: qs.stringify(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'post',
        }).then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
      })
  
}

// Get
const requestGet = (url, data = {}, headers) => {

    return new Promise((resolve, reject) => {
        service({
            url,
            params:data,
            transformRequest: [function(data) {
                let ret = ''
                for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            method: 'get',
        }).then(response => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          })
      })

}

// 文件上传
const requestFile = (url, data = {}, headers) => {
    return new Promise((resolve, reject) => {
        service({
            url: url,
            method: 'post',
            data,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            resolve(response);
        }).catch(error => {
            reject(error);
        });
    });
}


export { requestPost, requestGet, requestFile, requestFormPost }