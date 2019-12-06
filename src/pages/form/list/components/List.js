import React, { useState, useEffect } from 'react';
import { Table, Divider, Popconfirm, } from 'antd';
import { Pagination } from '@/components';
import ReactDragListView from 'react-drag-listview';

export default ({
  onPageChange,
  onShowSizeChange,
  handleDeliver,
  handleUpdate,
  handleUpdate2,
  onConfirmDelete,
  pagination,
  ...restProps
}) => {
  const initColumns = [
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
      dataIndex: 'email',
    }, {
      title: '电话号码',
      dataIndex: 'phone',
    }, {
      title: '日期',
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
  ]

  const [columns, setColumns] = useState(initColumns)

  const tableProps = {
    ...restProps,
    scroll: { x: true },
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
      const newColumns = columns.splice(0, columns.length);
      setColumns(newColumns)  
    },
    nodeSelector: "th"
  } 

  useEffect(()=> {
    // console.log(1111)
    let newColumns = [...columns];
    newColumns.map((item,index) => {
      if (item.title == '序号') {
        newColumns.splice(index,1,{
          title: '序号',
          dataIndex: 0,
          render: (text, record, index) => `${(pagination.current-1)*pagination.pageSize+index+1}` ,
        })
      }
    })
    setColumns(newColumns)
  }, [pagination]);

  return (
    <>
      <ReactDragListView.DragColumn {...dragProps}>
        <Table {...tableProps} />
      </ReactDragListView.DragColumn>
      <Pagination {...paginationProps} />
    </>
  )
}
