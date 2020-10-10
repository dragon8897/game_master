import Taro, { Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

declare const window: any

export default function Index() {

  const url = encodeURIComponent('https://static-game.didiapp.com/tools/gm/#/pages/login/login');
  const goto = encodeURIComponent('https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoamij3fefvog3emmv6&response_type=code&scope=snsapi_login&state=STATE&redirect_uri='+url)

  const handleMessage = function (event) {
    var origin = event.origin;
    if( origin == "https://login.dingtalk.com" ) { //判断是否来自ddLogin扫码事件。
      var loginTmpCode = event.data;
      window.location.assign(`https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoamij3fefvog3emmv6&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${url}&loginTmpCode=${loginTmpCode}`);
    }
  };
  if (typeof window.addEventListener != 'undefined') {
      window.addEventListener('message', handleMessage, false);
  } else if (typeof window.attachEvent != 'undefined') {
      window.attachEvent('onmessage', handleMessage);
  }

  return (
      <View>
        <Text style={{display: "block", textAlign: "center", fontSize: "50px"}}>GameMaster</Text>
        <Text style={{display: "block", textAlign: "center", fontSize: "30px"}}>游戏数据管理工具</Text>
        <View style={{width: "365px", height: "400px", margin: "100px auto"}}>
          <iframe src={"https://login.dingtalk.com/login/qrcode.htm?goto=" + goto} style={{border: "none", backgroundColor: "white"}} width="365px" height="400px"></iframe>
        </View>
      </View>
  )
}

Index.config = {
  navigationBarTitleText: '钉钉页',
} as Config
