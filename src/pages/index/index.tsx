import Taro, { Config, useState } from '@tarojs/taro'
import { View, Text, Button, Form, Input } from '@tarojs/components'
import './index.scss'

export default function Index() {
  const [id, setId] = useState(0)

  return (
      <View>
        <Text style={{display: "block", textAlign: "center", fontSize: "50px"}}>GameMaster</Text>
        <Text style={{display: "block", textAlign: "center", fontSize: "30px"}}>游戏数据管理工具</Text>
        <View style={{minWidth: "300px", width: "50%", height: "300px", margin: "auto", marginTop: "100px"}}>
          <Text style={{fontSize: "25px"}}>USER ID:</Text>
          <Form onSubmit={() => {setId(2)}}>
            <Input name="uid" style={{border: "thick", backgroundColor: "gray"}}
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

Index.config = {
  navigationBarTitleText: '登录页',
} as Config
