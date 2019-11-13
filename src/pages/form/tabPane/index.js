import React from 'react';
import { connect } from 'dva';
import { Card, Form,  Button, Tabs, message, Table, Divider, } from 'antd';
import { Pagination } from '@/components';
import styles from '@/styles/form/submit/index.less';
import router from 'umi/router';

const { TabPane } = Tabs;

const namespace = 'tabPane';

const TabList = ({
  dispatch,
  effect,
  list,
  pagination,
  tab,
  loading,
  ...restProps
}) => {
  
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
    }, {
      title: '性别',
      dataIndex: 'sex',
    },  {
      title: '工作',
      width:'200',
      dataIndex: 'job',
    }, {
      title: '操作',
      // fixed: 'right',
      render: (text, record) => (
        <span>
          <a onClick={handleDeliver.bind(this,record)}>发布</a>
          <Divider type="vertical" />
          {/* 动态渲染 */}
          { record.age < 25 ? <><a onClick={handleUpdate.bind(this,record)}>编辑</a><Divider type="vertical" /></> : ''}
          <a>详情</a>
        </span>
      ),
    },
  ];

  const handleUpdate = (record) => {

    console.log('当前行数据:',record)
  }

  const handleDeliver = (record) => {

  }

  const tableProps = {
    pagination,
    loading: loading.effects[`${namespace}/queryList`],
    dataSource: list,
    scroll: { x: true},
    columns,
    size: "middle",
    pagination: false,
    rowKey: (record,index) => index,
  };

  const paginationProps = {
    ...pagination,
    onChange(page, pageSize) {
      console.log('当前选择的页码:',page)
      const params = {
        tab,
        current: page,
        pageSize: pageSize
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
  };

  const callback = (key) => {
    dispatch({
      type: `${namespace}/queryList`,
      payload: {
        tab:key,
        current: 1,
        pageSize: 10,
      }
    })
  }

  return (
    <Card title="表单提交" className={styles.Card} extra={<a>注:本模板操作字段为动态渲染，事例为年龄大于25岁的用户没有编辑权限</a>}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="列表一" key="1">
          <Table {...tableProps} />
          <Pagination {...paginationProps} />
        </TabPane>
        <TabPane tab="列表二" key="2">
          <Table {...tableProps} />
          <Pagination {...paginationProps} />
        </TabPane>
    </Tabs>
    </Card>
  )
}

export default connect(({ tabPane, loading }) => ({ ...tabPane, loading }))(Form.create()(TabList));