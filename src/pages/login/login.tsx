import Taro, { Config, useEffect, useRouter, useState } from '@tarojs/taro'
import { View, Text, Button, Form, Input } from '@tarojs/components'
import './login.scss'
import API from '../../utils/api'
import { APIConfig, IAPILogin, IAPIUserInfo } from '../../constanst/api_config'

enum LoginStatus {
    Logining,
    LoginSuccess,
    LoginFail,
}

export default function Login() {
    const [loginStatus, setLoginStatus] = useState<LoginStatus>(LoginStatus.Logining)

    const router = useRouter()
    const code = router.params.code
    // const state = router.params.state

    useEffect(() => {
        const fetchData = async () => {
            const {err, data} = await API.request<IAPILogin>(APIConfig.Login, {code})
            if (err) {
                setLoginStatus(LoginStatus.LoginFail)
                return
            }
            setLoginStatus(data.success ? LoginStatus.LoginSuccess : LoginStatus.LoginFail)
        }
        fetchData()
    }, [])

    const [id, setId] = useState(0)
    const handleSubmit = async (e: any) => {
        const uid = parseInt(e.detail.value.uid)
        setId(uid)
        Taro.showLoading({
            title: "加载中",
        })
        const {err, data} = await API.request<IAPIUserInfo>(APIConfig.GetUserInfo, {user_id: uid})
        Taro.hideLoading()
        if (err) {
            if (err === "Unauthorized") {
                Taro.showModal({
                    title: '提示',
                    content: '权限校验失败, 请重新登录',
                    showCancel: false,
                    success: function () {
                        Taro.navigateTo({
                            url: `/pages/index/index`
                        })
                    }
                })
            } else {
                Taro.showToast({
                    title: `${err}`,
                    icon: "none",
                })
            }
            return
        }
        Taro.navigateTo({
            url: `/pages/detail/detail?user_id=${data.user_id}&lover_id=${data.lover_id}`
        })
    }

    const onBtnBackLoginClick = () => {
        Taro.navigateTo({
            url: `/pages/index/index`
        })
    }

    return (
        <View style={{minHeight: "100%"}}>
            {
                loginStatus === LoginStatus.Logining &&
                <View>
                    <Text>正在登陆</Text>
                </View>
            }
            {
                loginStatus === LoginStatus.LoginSuccess &&
                <View>
                    <Text style={{display: "block", textAlign: "center", fontSize: "50px"}}>GameMaster</Text>
                    <Text style={{display: "block", textAlign: "center", fontSize: "30px"}}>游戏数据管理工具</Text>
                    <View style={{minWidth: "300px", width: "50%", height: "300px", margin: "auto", marginTop: "100px"}}>
                    <Text style={{fontSize: "25px"}}>USER ID:</Text>
                    <Form onSubmit={handleSubmit}>
                        <Input name="uid" style={{border: "thick", backgroundColor: "gray"}}
                        placeholder='这是一个数字输入框'
                        value={`${id}`}
                        type='number'
                        maxLength={10}></Input>
                        <Button formType="submit" style={{width: "150px", marginRight: "0px", marginTop: "50px"}} >确定</Button>
                    </Form>
                    </View>
                </View>
            }
            {
                loginStatus === LoginStatus.LoginFail &&
                <View>
                    <Button onClick={onBtnBackLoginClick}>重新登陆</Button>
                </View>
            }
        </View>
    )
}

Login.config = {
    navigationBarTitleText: '登录页',
} as Config
