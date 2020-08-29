import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'

import './detail.scss'
import { DetailState, DetailAction } from './model'
import { DvaDispatch } from 'src/utils/dva_model'
import { connect } from '@tarojs/redux'

type DetailProps = DvaDispatch<DetailAction> & DetailState
@connect(({ detail }) => ({ ...detail }))
export default class Detail extends Component<DetailProps> {

  componentWillMount () { }

  componentDidMount () {
      this.props.dispatch({
          type: DetailAction.info
      })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '详情页'
  }

  render () {
    const scrollTop = 0
    const Threshold = 20
    const vStyleA = {
        height: '150px',
        'background-color': 'rgb(26, 173, 25)'
    }
    const vStyleB = {
        height: '150px',
        'background-color': 'rgb(39,130,215)'
    }
    const vStyleC = {
        height: '150px',
        'background-color': 'rgb(241,241,241)',
        color: '#333'
    }
    const {userId, loveId, neightbourId} = this.props
    return (
      <View>
        <Text style={{display: "block", textAlign: "center", fontSize: "50px"}}>GameMaster</Text>
        <View style={{display: "flex", backgroundColor: "black", width: "100%", position: "sticky", top: "0px"}}>
            <Text style={{fontSize: "20px", color: "white", display: "block", flex: "1", textAlign: "center"}}>user_id: {userId}</Text>
            <Text style={{fontSize: "20px", color: "white", display: "block", flex: "1", textAlign: "center"}}>lover_id: {loveId}</Text>
            <Text style={{fontSize: "20px", color: "white", display: "block", flex: "1", textAlign: "center"}}>neightbour_id: {neightbourId}</Text>
        </View>
        <ScrollView
            className='scrollview'
            scrollY
            scrollWithAnimation
            scrollTop={scrollTop}
            style={{marginTop: "0px", marginBottom: "0px"}}
            lowerThreshold={Threshold}
            upperThreshold={Threshold}
        >
            <View style={vStyleA}>A</View>
            <View style={vStyleB}>B</View>
            <View style={vStyleC}>C</View>
            <View style={vStyleA}>A</View>
            <View style={vStyleB}>B</View>
            <View style={vStyleC}>C</View>
            <View style={vStyleA}>A</View>
            <View style={vStyleB}>B</View>
            <View style={vStyleC}>C</View>
        </ScrollView>
      </View>
    )
  }
}
