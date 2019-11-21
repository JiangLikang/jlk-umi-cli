import { Form, Row, Col, Select, Input, Button, DatePicker } from 'antd';
import moment from 'moment';
import { formLayout, formItemLayout, } from '@/utils';
import styles from '@/styles/form/list/search.less'

const Option = Select.Option;

const Search = ({
  options,
  onAdd,
  onReset,
  onSearch,
  form: { getFieldDecorator, resetFields, setFields, validateFields }
}) => {
  const handleReset = () => {
    resetFields();
    onReset();
  }

  const handleSearch = (e) => {
    e.preventDefault();
    validateFields((error, values) => {
      
      if (error) {
        console.log(error)
      } else {
        console.log('查询条件',values)

        onSearch({
          ...values,
        });
      }
      
    })
  }

  // 不可选择的时间
  const disabledDate = (current) => {
    return current && current > moment().endOf('day');
  }

  const validUid = (rule, value, callback) => {
    console.log('执行一次自定义校验')
    callback()
  };
  
  // 接口数据动态渲染下拉框
  const Options = options.map((item,index)=>{

    return <Option key={index} value={item}>{item}</Option>
  })

  return (
    <Form onSubmit={handleSearch} layout="inline" className={styles.searchForm}>
      <Row gutter={{ md: 8 }}>
        <Col {...formLayout}>
          <Form.Item label={`用户编号`} {...formItemLayout}>
            {getFieldDecorator(`uid`, {
              rules: [
                {
                  required: true,
                  message: '用户编号不能为空',
                },
                {
                  validator: validUid,
                },
              ],
            })(<Input placeholder="请输入用户编号"  className={styles.searchInput}/>)}
          </Form.Item>
        </Col>
        <Col {...formLayout}>
          <Form.Item label={`用户名称`} {...formItemLayout}>
            {getFieldDecorator(`uname`, {
              rules: [
                {
                  required: true,
                  message: '用户名称不能为空',
                },
              ],
            })(<Select
              showSearch
              className={styles.searchInput}
              placeholder="请选择用户名称"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              { Options }
            </Select>)}
          </Form.Item>
        </Col>
        <Col {...formLayout}>
          <Form.Item label={`日期选择`} {...formItemLayout}>
            {getFieldDecorator(`date`, {
              rules: [
                {
                  required: true,
                  message: '请选择日期',
                },
              ],
            })(<DatePicker disabledDate={disabledDate} className={styles.searchInput}/>)}
          </Form.Item>
        </Col>
        <Col {...formLayout}>
          <Form.Item label={`家庭地址`} {...formItemLayout}>
            {getFieldDecorator(`address`, {
              rules: [
                {
                  required: true,
                  message: '家庭住址不能为空',
                },
              ],
            })(<Input placeholder="请输入家庭住址"  className={styles.searchInput}/>)}
          </Form.Item>
        </Col>
      </Row>
      <Row className={styles.searchBtnRow}>
        <Col span={12}>
          <Button type="primary" onClick={onAdd}>
            新增
          </Button>
        </Col>
        <Col span={12} className={styles.searchBtnAlign}>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
          <Button className={styles.searchReset} onClick={handleReset}>
            重置
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default Form.create()(Search);

