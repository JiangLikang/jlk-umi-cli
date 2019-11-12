import { submitForm, getOptions } from '../../../service/axios/interface';

export default {
  namespace: 'submit',
  state: {
    data : {},
    options: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, params = {} }) => {
        if (pathname === '/form/submit') {
          console.log('页面接受到的参数为:',params)
          dispatch({ 
            type: 'submitEffects',
            payload: {}
          });
          dispatch({ 
            type: 'save',
            payload: {}
          });
          dispatch({
            type: 'queryOptions'
          })
        }
      })
    }
  },
  effects: {
    *submitEffects({ payload = {} }, { put, call }) {
      console.log('submit 异步调用');
    },
    *submitForm({ payload = {} }, { put, call }) {
      let data = yield call(submitForm,payload)
      console.log('表单提交成功！返回的数据是:',data)
      return data
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
  },
  reducers: {
    save(state, { payload }) {
      console.log('submit 同步调用');
      return { ...state, ...payload }
    }
  }
}
