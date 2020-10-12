import Taro, { Config, useRouter, useState, useEffect } from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './detail.scss'
import "taro-ui/dist/style/components/modal.scss"
import API from '../../utils/api'
import { APIConfig, IAPIHandlersInfo, IAPIUpdateHandler } from '../../constanst/api_config'
import { HandlerType, InputType } from '../../constanst/types'

export default function Detail() {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("标题")
    const [currentName, setCurrentName] = useState("")
    const [currentLabel, setCurrentLabel] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [infos, setInfos] = useState<{
        name: string,
        handlers: HandlerType[]
    }[]>([])

    const router = useRouter()
    const userId = router.params.user_id
    const loverId = router.params.lover_id

    useEffect(() => {
        const fetchData = async () => {
            const {err, data} = await API.request<IAPIHandlersInfo>(APIConfig.GetHandlersInfo)
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
                        title: err,
                    })
                }
                return
            }
            setInfos(data.info)
        }
        fetchData()
    }, [])

    const onModelConfirm = () => {
        setIsOpen(false)
        updateInfo(currentName, currentLabel, inputValue)
        setInputValue("")
    }

    const showInput = (params: {
        title: string,
        type: 'text' | 'number' | 'idcard' | 'digit',
    }) => {
        setTitle(params.title)
        setIsOpen(true)
    }

    const sendUpdate = async (name: string, label: string) => {
        for (const info of infos) {
            if (info.name === name) {
                for (const h of info.handlers) {
                    if (h.label === label) {
                        if (h.input !== InputType.None) {
                            setCurrentLabel(label)
                            setCurrentName(name)
                            showInput({
                                title: name,
                                type: "text"
                            })
                            return
                        } else {
                            updateInfo(name, label)
                        }
                        break
                    }
                }
                break
            }
        }
    }

    const updateInfo = async (name: string, label: string, input?: string) => {
        for (const info of infos) {
            if (info.name === name) {
                for (const h of info.handlers) {
                    if (h.label === label) {
                        const params: {
                            user_id?: string,
                            lover_id?: string,
                            input?: string,
                        } = {}
                        h.params.forEach(p => {
                            switch (p) {
                                case "user_id":
                                    params.user_id = userId
                                    break
                                case "lover_id":
                                    params.lover_id = loverId
                                    break
                                case "input":
                                    params.input = input
                                    break
                            }
                        })
                        const {err, data} = await API.request<IAPIUpdateHandler>(APIConfig.UpdateHandler, {
                            name,
                            label,
                            params,
                        })
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
                                    title: err,
                                })
                            }
                            return
                        }
                        if (data.success) {
                            Taro.showToast({
                                title: "更新成功",
                            })
                        } else {
                            Taro.showToast({
                                title: "更新失败, 请重试",
                            })
                        }
                        break
                    }
                }
                break
            }
        }
    }

    return (
      <View>
        <Text style={{display: "block", textAlign: "center", fontSize: "50px"}}>GameMaster</Text>
        <View style={{display: "flex", backgroundColor: "black", width: "100%", position: "sticky", top: "0px"}}>
            <Text style={{fontSize: "20px", color: "white", display: "block", flex: "1", textAlign: "center"}}>user_id: {userId}</Text>
            <Text style={{fontSize: "20px", color: "white", display: "block", flex: "1", textAlign: "center"}}>lover_id: {loverId}</Text>
        </View>
        <View>
            {
                infos.map(info =>
                <View style={{position: "relative", border: "solid", borderRadius: "30px", padding: "30px", maxWidth: "500px", margin: "30px auto"}}>
                    <Text style={{position: "absolute", top: "-25px", fontSize: "30px", display: "inline", backgroundColor: "white"}}>{info.name}</Text>
                    {
                        info.handlers.map(h =>
                        <Button type="primary" onClick={() => {sendUpdate(info.name, h.label)}}>{h.label}</Button>
                        )
                    }
                </View>)
            }
        </View>
        <AtModal isOpened={isOpen} closeOnClickOverlay={false}>
            <AtModalHeader>{title}</AtModalHeader>
            <AtModalContent>
                <Input style={{border: "thick", backgroundColor: "gray"}}
                placeholder='默认输入框'
                value={inputValue}
                onInput={(e) => {setInputValue(e.detail.value)}}
                ></Input>
            </AtModalContent>
            <AtModalAction>
                <Button onClick={() => {
                    setIsOpen(false)
                    setInputValue("")
                }}>取消</Button>
                <Button onClick={onModelConfirm}>确定</Button>
            </AtModalAction>
        </AtModal>
      </View>
    )
}

Detail.config = {
    navigationBarTitleText: '详情页'
} as Config
