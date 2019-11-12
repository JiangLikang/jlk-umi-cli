import React from 'react';
import { connect } from 'dva';
import { Card, Descriptions  } from 'antd';


const namespace = 'detail';

const Detail = ({
    data,
    ...restProps
}) => {
  const { 
    name = '',
    phone = '', 
    email = '',
    id = '',
    gender = '', 
    city = '', 
  } = data;

  return (
      <Card>
        <Descriptions title="详情展示">
          <Descriptions.Item label="用户名">{name}</Descriptions.Item>
          <Descriptions.Item label="联系电话">{phone}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
          <Descriptions.Item label="用户编号">{id}</Descriptions.Item>
          <Descriptions.Item label="性别">{gender}</Descriptions.Item>
          <Descriptions.Item label="所在城市">{city}</Descriptions.Item>
        </Descriptions>
      </Card>
  )
}

export default connect(({ loading, detail }) => ({ loading, ...detail }))(Detail);