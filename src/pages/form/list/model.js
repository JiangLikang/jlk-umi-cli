
// import { message } from 'antd';
import { pagination } from '@/utils';
import { getTableList, getOptions, deleteRow } from '../../../service/axios/interface';

export default {
  namespace: 'searchList',
  state: {
    query: {
      results: 10,
    },
    list: [],
    pagination,
    visible: false,
    options:[],
    columns: [
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
      // {
      //   title: '操作',
      //   // fixed: 'right',
      //   render: (text, record) => (
      //     <span>
      //       <a onClick={handleDeliver.bind(this,record)}>发布</a>
      //       <Divider type="vertical" />
      //       <a onClick={handleUpdate.bind(this,record)}>编辑</a>
      //       <Divider type="vertical" />
      //       <a onClick={handleUpdate2.bind(this,record)}>编辑(跳页)</a>
      //       <Divider type="vertical" />
      //       <a>详情</a>
      //       <Divider type="vertical" />
      //       <Popconfirm placement="left" title={'确认删除？'} onConfirm={onConfirmDelete.bind(this,record)} okText="确定" cancelText="取消">
      //         <a>删除</a>
      //       </Popconfirm>
    
      //     </span>
      //   ),
      // },
    ]
  },
  
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/form/list') {
          dispatch({ type: 'queryOptions' }).then(()=>{
            dispatch({ type: 'queryList', payload:{results: 10} });
          })
        }
      })
    }
  },
  effects: {
    *deliver({ payload = {} }, { select, put, call }) {
      let response = yield call(deleteRow,payload)
      return response
    },
    *deleteRow({ payload = {} }, { select, put, call }) {
      console.log('发送给接口待删除的行数据:',payload)
      let response = yield call(deleteRow,payload)
      return response
    },
    *queryOptions({ payload = {} }, { select, put, call }) {
      let options = yield call(getOptions)
      console.log('接口传回的动态选项',options.data)
      yield put({
        type: 'save',
        payload: {
          options: options.data,
        }
      })
    },
    *queryList({ payload = {} }, { select, put, call }) {
      let { pagination } = yield select(state => state.searchList);
      const current = payload.current || pagination.current;
      const pageSize = payload.pageSize || pagination.pageSize;
      const offset = (current-1)*pageSize
      let data = yield call(getTableList,{
        ...payload,
        current,
        pageSize,
        offset
      })
      console.log('接口传回的数据:',data )
      yield put({
        type: 'save',
        payload: {
          list: data.results,
          pagination: {
            current, 
            pageSize, 
            total: 100, 
          },
        }
      })
    },
    *Modal({ payload = {} }, { select, put, call }) {
      
      yield put({
        type: 'save',
        payload: {
          visible: payload.visible
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  }
}
