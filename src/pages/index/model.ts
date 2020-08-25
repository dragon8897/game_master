
export default {
  namespace: 'index',
  state: {
      id: 0,
  },

  effects: {
  },

  reducers: {
    save(state, { payload }) {
        return { ...state, ...payload }
    },
    submit(state, { payload }) {
        console.log("fff", state)
        return { ...state, ...payload }
    },
  }

}
