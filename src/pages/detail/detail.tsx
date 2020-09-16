import Taro, { Config, useState } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import './detail.scss'

export default function Detail() {

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

    const [userId, setUserId] = useState(0)
    const [loveId, setLoveId] = useState(0)
    const [neightbourId, setNeightbourId] = useState(0)

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

Detail.config = {
    navigationBarTitleText: '详情页'
} as Config
