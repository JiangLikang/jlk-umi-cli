import React, { useState, useEffect } from 'react';
import { Table, Divider, Popconfirm, } from 'antd';
import { Pagination } from '@/components';
import ReactDragListView from 'react-drag-listview';
import Operate from './operate'

export default ({
  onPageChange,
  onShowSizeChange,
  handleDeliver,
  handleUpdate,
  handleUpdate2,
  onConfirmDelete,
  pagination,
  // columns,
  onDragEnd,
  ...restProps
}) => {
  // const columns = [
  //   {
  //     title: '序号',
  //     dataIndex: 0,
  //     render: (text, record, index) => `${(pagination.current-1)*pagination.pageSize+index+1}` ,
  //   }, {
  //     title: '用户名',
  //     dataIndex: 'name',
  //     render: name => `${name.first} ${name.last}`,
  //   }, 
  //   {
  //     title: '年龄',
  //     dataIndex: 'dob.age',
  //   }, {
  //     title: '性别',
  //     dataIndex: 'gender',
  //   }, {
  //     title: '邮箱',
  //     width:'200',
  //     dataIndex: 'email',
  //   }, {
  //     title: '电话号码',
  //     width:'200',
  //     dataIndex: 'phone',
  //   }, {
  //     title: '日期',
  //     width:'200',
  //     dataIndex: 'dob.date',
  //   }, 
  //   {
  //     title: '操作',
  //     // fixed: 'right',
  //     render: (text, record) => (
  //       <span>
  //         <a onClick={handleDeliver.bind(this,record)}>发布</a>
  //         <Divider type="vertical" />
  //         <a onClick={handleUpdate.bind(this,record)}>编辑</a>
  //         <Divider type="vertical" />
  //         <a onClick={handleUpdate2.bind(this,record)}>编辑(跳页)</a>
  //         <Divider type="vertical" />
  //         <a>详情</a>
  //         <Divider type="vertical" />
  //         <Popconfirm placement="left" title={'确认删除？'} onConfirm={onConfirmDelete.bind(this,record)} okText="确定" cancelText="取消">
  //           <a>删除</a>
  //         </Popconfirm>
 
  //       </span>
  //     ),
  //   },
  // ];
  const [columns, setColums] = useState([
      {
        title: '序号',
        dataIndex: 0,
        render: (text, record, index) => `${(pagination.current-1)*pagination.pageSize+index+1}` ,
      }, {
        title: '用户名',
        dataIndex: 'name',
        render: name => `${name.first} ${name.last}`,
      }, 
      {
        title: '年龄',
        dataIndex: 'dob.age',
      }, {
        title: '性别',
        dataIndex: 'gender',
      }, {
        title: '邮箱',
        width:'200',
        dataIndex: 'email',
      }, {
        title: '电话号码',
        width:'200',
        dataIndex: 'phone',
      }, {
        title: '日期',
        width:'200',
        dataIndex: 'dob.date',
      }, 
      {
        title: '操作',
        fixed: 'right',
        render: (text, record) => (
          <span>
            <a onClick={handleDeliver.bind(this,record)}>发布</a>
            <Divider type="vertical" />
            <a onClick={handleUpdate.bind(this,record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={handleUpdate2.bind(this,record)}>编辑(跳页)</a>
            <Divider type="vertical" />
            <a>详情</a>
            <Divider type="vertical" />
            <Popconfirm placement="left" title={'确认删除？'} onConfirm={onConfirmDelete.bind(this,record)} okText="确定" cancelText="取消">
              <a>删除</a>
            </Popconfirm>
   
          </span>
        ),
      },
    ])

  console.log('columns',columns)

  const tableProps = {
    ...restProps,
    scroll: { x: true},
    columns,
    size: "middle",
    pagination: false,
    rowKey: record => record.login.uuid,
  };

  const paginationProps = {
    ...pagination,
    onChange(page, pageSize) {
      onPageChange(page, pageSize);
    },
    onShowSizeChange(current, size) {
      onShowSizeChange(current, size);
    }
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      // onDragEnd(fromIndex, toIndex)
      const item = columns.splice(fromIndex, 1)[0];
      columns.splice(toIndex, 0, item)
      console.log('item',item)
      console.log('ccc',columns)
      // console.log('aaa',columns.splice(toIndex, 0, item))
      const newColumns = columns.splice(0, columns.length);
      console.log('new',newColumns)

      // cosnt 

      // s-index = 5
      // s = [1,2,3,4]
      // [6,7,8,9]


      // i-index = 3
      // const newColumns = [
      //   ...[1, 2]
      //   {xxx}, // 移动数据
      //   ...[3,4,5,6]
      // ]



      setColums(newColumns)  
      // console.log(tableProps)
    },
    nodeSelector: "th"
  } 
 
  useEffect(()=> {
    console.log(1111)
  }, [columns]);

  return (
    <>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table {...tableProps} />
      </ReactDragListView.DragColumn>
      <Pagination {...paginationProps} />
    </>
  )
}
