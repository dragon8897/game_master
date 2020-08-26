import React, { Component } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import { connect } from 'react-redux'
import { IndexState } from './model'
import { DvaDispatch } from 'src/utils/dva_model'

import './index.scss'

type IndexProps = DvaDispatch & IndexState
@connect(({ index }) => ({ ...index }))
class Index extends Component<IndexProps> {

  constructor(props: IndexProps) {
    super(props)
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onSubmit = () => {
    this.props.dispatch({
      type: "index/tick",
      payload: {num: 3}
    })
  }

  render () {
    const {id, name} = this.props
    return (
      <View className='index' style={{backgroundColor: "pink"}}>
        <Text style={{display: "block", textAlign: "center", fontSize: "50px"}}>GameMaster</Text>
        <Text style={{display: "block", textAlign: "center", fontSize: "30px"}}>游戏数据管理工具</Text>
        <Text style={{display: "block", textAlign: "center", fontSize: "30px"}}>{name}</Text>
        <View style={{minWidth: "300px", width: "50%", height: "300px", margin: "auto", marginTop: "100px", border: "dashed red"}}>
          <Text style={{fontSize: "25px"}}>USER ID:</Text>
          <Input style={{border: "thick double", backgroundColor: "gray"}} type='number' placeholder='这是一个数字输入框' maxlength={10} focus>{id}</Input>
          <Button style={{width: "150px", marginRight: "0px", marginTop: "50px"}} onClick={this.onSubmit}>确定</Button>
        </View>
      </View>
    )
  }
}

export default Index
