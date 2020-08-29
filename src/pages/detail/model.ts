import DvaModel from "src/utils/dva_model"

export enum DetailAction {
    info = "detail/getInfo"
}

export interface DetailState {
  userId: number,
  loveId: number,
  neightbourId: number,
}

const delay = (time: number) => {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, time);
    })
}

export default {
  namespace: 'detail',
  state: {
    userId: 0,
    loveId: 0,
    neightbourId: 0,
  },

  effects: {
    *getInfo({ payload }, {put, call}) {
      yield call(delay, 1500)
      yield put({ type: "info", payload })
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
    info(state, { payload }) {
      console.log("fff")
      state.userId = 11111
      state.loveId = 11112
      state.neightbourId = 11113
      return { ...state, ...payload }
    },
  }
} as DvaModel<DetailState>
