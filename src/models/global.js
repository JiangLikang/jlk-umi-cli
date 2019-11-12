export default {
  namespace: 'global',
  state: {
    collapsed: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
