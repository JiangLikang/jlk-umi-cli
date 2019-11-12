import {requestPost, requestGet} from './axiosConfig';

// 表格数据
export function getTableList(params){

    return  requestGet(`https://randomuser.me/api`,params)
} 

// 提交表单
export function submitForm(params){

    return  requestGet(`/mock/submitForm`,params)
}

// 详情展示
export function getDetail(params){
    
    return  requestPost(`/mock/getDetail`,params)
} 

// 动态下拉框
export function getOptions(params){
    
    return  requestGet(`/mock/getOptions`,params)
} 

// 删除行
export function deleteRow(params){
    
    return  requestPost(`/mock/deleteRow`,params)
} 

// 发布接口
export function deliver(params){
    
    return  requestPost(`/mock/deliver`,params)
}

// tab模板列表数据
export function getTabTableList(params){
    
    return  requestGet(`/mock/getTableList`,params)
} 