import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Card, Form, Input, Select, Button, DatePicker, message } from 'antd';
import styles from '@/styles/form/submit/index.less';
import router from 'umi/router';

const {  RangePicker, } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const namespace = 'submit';

const Submit = ({
  submit,
  options,
  loading,
  location,
  dispatch,
  form: { getFieldDecorator, validateFields,setFields,getFieldValue,setFieldsValue },
  ...restProps
}) => {
  // 不可选择的时间
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }

  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 12 },
  };

  const handleSearch = (e) => {
    e.preventDefault();
    validateFields((error, values) => {
      
      if (error) {
        console.log(error)
      } else {
        console.log('提交的参数为',values)
        dispatch({
          type: `${namespace}/submitForm`,
          payload: values
        }).then((res) => {
          if (res.code === 0) {
            message.success('表单提交成功！')
            router.push('/form/list')
          } else {
            message.error('表单提交失败')
          }
        })
        
      }
      
    })
  }

  const handleReturn = () => {
    router.go(-1)
  }

  // 接口数据动态渲染下拉框
  const Options = options.map((item,index)=>{

    return <Option key={index} value={item}>{item}</Option>
  })
  
  return (
    <Card title="表单提交" className={styles.Card} extra={<a onClick={handleReturn}>返回</a>}>
      <Form onSubmit={handleSearch}>
        <Form.Item {...formItemLayout} label="输入框">
          {getFieldDecorator('input', {
            rules: [
              { required: true, message: '请输入...' },
              { max: 20,message:'最多填写20个字符'}
            ],
          })(
            <Input  placeholder="请输入..." />,
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="请选择一">
          {getFieldDecorator('select-1', {
            rules: [
              { required: true, message: '请选择一...' },
            ],
          })(
            <Select placeholder="请选择一...">
              { Options }
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="请选择二">
          {getFieldDecorator('select-2', {
            rules: [
              { required: true, message: '请选择二...' },
            ],
          })(
            <Select 
              placeholder="请选择二..."
              mode="multiple"
            >
              { Options }
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="时间选择一">
          {getFieldDecorator('Date-picker-1', {
            rules: [
              { required: true, message: '请选择时间' },
            ],
          })(
            <DatePicker disabledDate={disabledDate} />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="时间选择二">
          {getFieldDecorator('Date-picker-2', {
            rules: [
              { required: true, message: '请选择时间' },
            ],
          })(
            <RangePicker />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="文本输入">
          {getFieldDecorator('textArea', {
            rules: [
              { required: true, message: '请选择输入文本' },
            ],
          })(
            <TextArea rows={4} />
          )}
        </Form.Item>
        <Form.Item 
          {...{
            wrapperCol: { span: 12, offset: 3 },
          }}
        >
            <Button type="primary" className={styles.submitBtn} htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default connect(({ submit, loading }) => ({ ...submit, loading }))(Form.create()(Submit));