import React, { useState } from 'react';
import { Table,Modal,Form,Button,Icon,Input,Popover,Row,Col } from 'antd';
import styles from './index.less';

const GroupCheckModal = ({
  data = [],
  groupModalVisible,
  onSearch,
  onOk,
  onCancel,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState([]);

  const reset = ()=>{
    setSearchValue('');
    setSelectedGroup([]);
  }

  const searchChange = (e)=>{
    setSearchValue(e.target.value);
  }

  const handleSearch = () => {
    onSearch(searchValue);
  }
  
  const handleOk = (e) => {
    onOk(selectedGroup);
    reset();
  }

  const handleCancel = () => {
    onCancel();
    reset();
  }

  const modalProps = {
    title : '选择填报人群组',
    visible: groupModalVisible,
    onOk: handleOk,
    onCancel: handleCancel,
    destroyOnClose : true,
    pagation: false,
    width: 600
  }

  const columns = [
    {
      title: '群组名称',
      dataIndex: 'groupName',
      width: 200,
      render: (text, record) => {
        let recordMemberJson = JSON.parse(record.memberInfo);
        let memberList = [];
        for(let i = 0; i < recordMemberJson.length; i++){
          memberList.push(<span key={recordMemberJson[i].oaId}>{`${recordMemberJson[i].name}-${recordMemberJson[i].oaId}-${recordMemberJson[i].department}；`}</span>)
        }
        return (
          <>
            <span>{text}</span>
            <Popover 
              title="组内成员" trigger="click"
              content={
                <div style={{maxHeight:100,overflowY:'scroll',maxWidth:400,fontSize:12}}>
                  {memberList}
                </div>
              }
            >
              <Icon type="info-circle" theme="filled" style={{color: '#B9BEC3', marginLeft: 5}} />
            </Popover>
          </>
        )
      },
    },
    {
      title: '创建人',
      dataIndex: 'createOpeateName',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      width: 150
    },
  ];
  
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedGroup(selectedRows);
    }
  };

  const tableProps = {
    rowSelection,
    columns,
    dataSource : data,
    pagination : false,
    size: 'small',
    scroll: { y: 240 }
  }

  return (
    <Modal {...modalProps} className={styles.GroupCheckModal}>
      <Row style={{marginBottom:20}}>
        <Col span={20}>
          <Input type="text" placeholder="请输入群组名称搜索" value={searchValue} onChange={searchChange} />
        </Col>
        <Col span={4} style={{textAlign:'right'}}>
          <Button type="primary" onClick={handleSearch}>搜 索</Button>
        </Col>
      </Row>
      <Table {...tableProps} rowKey="id" />
    </Modal>
  )
}

export default GroupCheckModal;