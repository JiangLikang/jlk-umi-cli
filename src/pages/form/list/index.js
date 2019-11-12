import React from 'react';
import { connect } from 'dva';
import { Card, message } from 'antd';
import { Search, List, AddModal, } from './components';
import router from 'umi/router';

const namespace = 'searchList';

const Page = ({
  dispatch,
  effect,
  pagination,
  list,
  loading,
  visible,
  options,
  query,
  ...restProps
}) => {
  const searchProps = {
    options,
    onAdd(){
      router.push('/form/submit')
    },
    onReset(){
      console.log('清除')
    },
    onSearch(params){
      console.log('传出参数',params)
      Object.assign(params,{
        results: 10
      })
      dispatch({
        type: `${namespace}/save`,
        payload: {
          query:params,
          pagination:{
            current: 1,
            pageSize:10
          }
        }
      })
      dispatch({
        type: `${namespace}/queryList`,
        payload: params,
        pagination:{
          current: 1,
          pageSize:10
        }
      })
    }
  };
  const listProps = {
    pagination,
    loading: loading.effects[`${namespace}/queryList`,`${namespace}/deliver`],
    dataSource: list,
    onPageChange(page, pageSize) {
      console.log('当前选择的页码:',page)
      const params = {
        current: page,
        pageSize: pageSize,
        ...query
      }
      dispatch({
        type: `${namespace}/queryList`,
        payload: params
      })

     },
     onShowSizeChange(current,size) { 
      dispatch({
        type:`${namespace}/save`,
          payload:{pagination:{...pagination,pageSize:size,current:current}}
      })
      dispatch({ 
        type: `${namespace}/queryList`,
      });
    },
    handleDeliver(record) {
      dispatch({
        type: `${namespace}/deliver`,
        payload: record
      }).then((res) => {
        console.log('接口返回状态:',res)
        if (res.code === 0) {
          message.success('发布成功！')
        } else {
          message.error('发布失败')
        }
      })
    },
    handleUpdate(record) {
      console.log('传出的行数据为:',record)
      dispatch({
        type: `${namespace}/Modal`,
        payload: {
          visible: true
        }
      })
    },
    handleUpdate2(record) {
      router.push({
        pathname: '/form/submit',
        params: record
      })
    },
    onConfirmDelete(record) { 
      dispatch({
        type: `${namespace}/deleteRow`,
        payload: record,
      }).then((res)=>{
          console.log('接口返回状态:',res)
          if (res.code === 0) {
            message.success('删除成功！');
          } else {
            message.error('删除失败')
          }
      })
    }
  };

  const modalProps = {
    title: '标题',
    visible,
    onOk() {
      
    },
    onCancel() {
      dispatch({
        type: `${namespace}/Modal`,
        payload: {
          visible: false
        }
      })
     },
  }

  return (
    <Card bordered={false}>
      <Search {...searchProps} />
      <List {...listProps} />
      <AddModal {...modalProps} />
    </Card>
  )
}

export default connect(({ loading, searchList }) => ({
  loading,
  ...searchList
}))(Page);
