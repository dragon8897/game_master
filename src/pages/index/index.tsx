import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button, Form, Input } from '@tarojs/components'
import './index.scss'
import { IndexState } from './model'
import { connect } from '@tarojs/redux'
import { DvaDispatch } from '../../utils/dva_model'

type IndexProps = DvaDispatch<string> & IndexState
@connect(({ index }) => ({ ...index }))
export default class Index extends Component<IndexProps> {

  constructor(props: IndexProps) {
    super(props)
  }

  componentWillMount () { }

  componentDidMount () { }

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
    navigationBarTitleText: '登录页'
  }

  onSubmit = (e: any) => {
    this.props.dispatch({
      type: "index/tick",
      payload: e.detail.value.uid,
    })
  }

  render () {
    const {id} = this.props
    return (
      <View className='index' style={{backgroundColor: "pink"}}>
        <Text style={{display: "block", textAlign: "center", fontSize: "50px"}}>GameMaster</Text>
        <Text style={{display: "block", textAlign: "center", fontSize: "30px"}}>游戏数据管理工具</Text>
        <View style={{minWidth: "300px", width: "50%", height: "300px", margin: "auto", marginTop: "100px", border: "dashed red"}}>
          <Text style={{fontSize: "25px"}}>USER ID:</Text>
          <Form onSubmit={this.onSubmit}>
            <Input name="uid" style={{border: "thick double", backgroundColor: "gray"}}
              placeholder='这是一个数字输入框'
              value={`${id}`}
              type='number'
              maxLength={10}></Input>
            <Button formType="submit" style={{width: "150px", marginRight: "0px", marginTop: "50px"}} >确定</Button>
          </Form>
        </View>
      </View>
    )
  }
}
