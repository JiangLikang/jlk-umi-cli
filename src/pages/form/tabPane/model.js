import { pagination } from '@/utils';
import { getTableList, deleteRow, getTabTableList} from '../../../service/axios/interface';

export default {
  namespace: 'tabPane',
  state: {
    tab: 1,
    list: [],
    pagination,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, params = {} }) => {
        if (pathname === '/form/tabPane') {
          dispatch({ 
            type: 'queryList', 
            payload:{ 
              tab:1,
              current: 1,
              pageSize: 10
            } 
          });
        }
      })
    }
  },
  effects: {
    *queryList({ payload = {} }, { select, put, call }) {
      let { pagination,tab } = yield select(state => state.tabPane);
      const current = payload.current || pagination.current;
      const pageSize = payload.pageSize || pagination.pageSize;
      const offset = (current-1)*pageSize
      console.log('前端发送的参数为:',{
        ...payload,
        current,
        pageSize,
        offset
      })
      let data = yield call(getTabTableList,{
        ...payload,
        pageSize,
        offset,
      })
      console.log('接口传回的数据:',data )
      yield put({
        type: 'save',
        payload: {
          tab:payload.tab||tab,
          list: data.data,
          pagination: {
            current, 
            pageSize, 
            total: data.total, 
          },
        }
      })
    },
  },
  reducers: {
    save(state, { payload }) {
      console.log('Reducer同步调用');
      return { ...state, ...payload }
    }
  }
}
