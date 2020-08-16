import Taro from '@tarojs/taro'
import { Provider } from "react-redux";
import dva from './utils/dva';
import { globalData } from './utils/common';

import models from './models'
import React, { Component } from 'react'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


const dvaApp = dva.createApp({
  initialState:{},
  models:  models,
})

const store = dvaApp.getStore();

class App extends Component {

  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   */
  async componentDidMount () {
    // 获取设备信息
    const sys = await Taro.getSystemInfo()
    sys && (globalData.systemInfo = sys)
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  render () {
    return (
      <Provider store={store}>
        {this.props.children} 
      </Provider>
    )
  }
}

export default App