import Taro, { Config, useRouter, useState, useEffect } from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './detail.scss'
import "taro-ui/dist/style/components/modal.scss"
import API from '../../utils/api'
import { APIConfig, IAPIHandlersInfo } from '../../constanst/api_config'

export default function Detail() {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [infos, setInfos] = useState<{
        name: string,
        handlers: {
            label: string,
            params: string[],
        }[]
    }[]>([])

    const router = useRouter()
    const userId = router.params.user_id
    const loverId = router.params.lover_id

    useEffect(() => {
        console.log("kkkffffff")
        const fetchData = async () => {
            const {err, data} = await API.request<IAPIHandlersInfo>(APIConfig.GetHandlersInfo)
            if (err) {
                return
            }
            setInfos(data.info)
        }
        fetchData()
    }, [])

    const onModelConfirm = () => {
        setIsOpen(false)
        setInputValue("")
    }

    const updateInfo = (name: string, label: string) => {
        console.log("name", name, label)
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
                <View>
                    <Text>{info.name}</Text>
                    {
                        info.handlers.map(h =>
                        <Button onClick={() => {updateInfo(info.name, h.label)}}>{h.label}</Button>
                        )
                    }
                </View>)
            }
        </View>
        <Button onClick={() => {setIsOpen(true)}}>显示</Button>
        <AtModal isOpened={isOpen} closeOnClickOverlay={false}>
            <AtModalHeader>标题</AtModalHeader>
            <AtModalContent>
                <Input name="uid" style={{border: "thick", backgroundColor: "gray"}}
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
