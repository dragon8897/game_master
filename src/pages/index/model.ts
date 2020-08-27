import DvaModel from "src/utils/dva_model"

export enum IndexType {
    Tick = "index/tick"
}

export interface IndexState {
  id: number,
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
  },

  effects: {
    *tick({ payload }, {put, call}) {
      yield call(delay, 1500)
      yield put({ type: "submit", payload })
    }
  },

  reducers: {
    save(state, { payload }) {
        return { ...state, ...payload }
    },
    submit(state, { payload }) {
        state.id = parseInt(payload) + 1
        return { ...state, ...payload }
    },
  }
} as DvaModel<IndexState>
