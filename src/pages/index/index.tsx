import { View} from '@tarojs/components'
import { connect } from 'react-redux'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
import React, { Component } from 'react'

@connect(({ index }) => ({
    ...index,
}))
class Index extends Component<IndexProps,IndexState > {

  constructor(props: IndexProps) {
    super(props)
    this.state = {}
  }

  async getList() {
    await this.props.dispatch({
      type: 'index/getList',
      payload: {}
    })
  }

  componentDidMount() {
    this.getList()
  }

  render() {
    const { data } = this.props
    console.log('this.props===>>',data);
    
    return (
      <View className='fx-index-wrap'>
          <View className='index-topbar'>New资讯</View>
          <View className='index-data'>
            {
              data && data.map((item,index) => {
                return (
                  <View className='index-list' key={index}>
                    <View className='index-title'>{item.title}</View>
                    <View className='index-img' style={`background-image: url(${item.thumbnail_pic_s})`}></View>
                  </View>
                )
              })
            }
          </View>
      </View>
    )
  }
}

export default Index
