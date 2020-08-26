import DvaModel from "src/utils/dva_model"

export interface IndexState {
  id: number,
  name: string,
}

const delay = (time: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, time);
    })
}

export default {
  namespace: 'index',
  state: {
      id: 0,
      name: "ffkktt",
  },

  effects: {
    *tick({ payload }, {put, call}) {
      console.log("kkkfff", payload)
      yield call(delay, 1500)
      yield put({ type: "submit" })
    }
  },

  reducers: {
    save(state, { payload }) {
        return { ...state, ...payload }
    },
    submit(state, { payload }) {
        state.id++
        return { ...state, ...payload }
    },
  }
} as DvaModel<IndexState>
