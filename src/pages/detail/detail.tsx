import Taro, { Config, useRouter, useState } from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './detail.scss'
import "taro-ui/dist/style/components/modal.scss"

export default function Detail() {
    const [isOpen, setIsOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const router = useRouter()
    const userId = router.params.user_id
    const loverId = router.params.lover_id

    const onModelConfirm = () => {
        setIsOpen(false)
        console.log("kkk", inputValue)
        setInputValue("")
    }

    return (
      <View>
        <Text style={{display: "block", textAlign: "center", fontSize: "50px"}}>GameMaster</Text>
        <View style={{display: "flex", backgroundColor: "black", width: "100%", position: "sticky", top: "0px"}}>
            <Text style={{fontSize: "20px", color: "white", display: "block", flex: "1", textAlign: "center"}}>user_id: {userId}</Text>
            <Text style={{fontSize: "20px", color: "white", display: "block", flex: "1", textAlign: "center"}}>lover_id: {loverId}</Text>
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
