import mockjs from 'mockjs';
export default {
  // 支持值为 Object 和 Array
  'GET /mock/submitForm': {
    "code":0,
    "data":
      {
        'ok': 1
      },
      "message":"提交成功"
  },
                  
  'POST /mock/getDetail': {
    "code":0,
    "data":
      {
        'name': '艾瑞莉娅',
        'phone': '15236546985',
        'email': 'arron.hicks@example.com',
        'id': '081-538-4145',
        'gender': '女',
        'city': '杭州'
      },
    "message":"成功"
  },
   
  'GET /mock/getOptions': {
    "code":0,
    "data":['盖伦','亚索','盲僧'],
    "message":"成功"
  },

  'POST /mock/deleteRow': {
    "code":0,
    "message":"成功"
  },

  'POST /mock/deliver': {
    "code":0,
    "message":"成功"
  },

  'GET /mock/getTableList': mockjs.mock({
    "code":0,
    "data|10":[{    //生成|num个如下格式名字的数据

      "id|+1":1,  //数字从当前数开始后续依次加一

      "name":"@cname",    //名字为随机中文名字

      "age|18-28":25,    //年龄为18-28之间的随机数字

      "sex|1":["男","女"],    //性别是数组中的一个，随机的

      "job|1":["web","UI","python","php"]    //工作是数组中的一个

    }],
      "total": 200
  }),

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req, res) => { res.end('OK'); },
};