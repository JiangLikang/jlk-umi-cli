import { request, api, mockApi } from '@/utils'

// 获取token
export const getToken = param => {
  return request(`${api}/main/getToken`, {
    name: '获取token',
    method: 'post',
    type: 'json',
    body: param
  });
}