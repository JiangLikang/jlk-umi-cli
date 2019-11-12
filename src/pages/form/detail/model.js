import { getDetail } from '../../../service/axios/interface';

export default {
  namespace: 'detail',
  state: {
    data: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/form/detail') {
          dispatch({ type: 'getDetail' });
        }
      })
    }
  },
  effects: {
    *getDetail({ payload = {} }, { put, call }) {
      let data = yield call(getDetail,payload)
      yield put ({
        type:'save',
        payload:{
          data: data.data,
        }
      })
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
