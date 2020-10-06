import { HttpMethod } from "../utils/api"
import { HandlerType } from "./types"

// api 配置信息
export const APIConfig = {
    GetUserInfo: {
        url: "/gm/user/info",
        method: HttpMethod.GET,
    },
    GetHandlersInfo: {
        url: "/gm/handlers/info",
        method: HttpMethod.GET,
    },
    UpdateHandler: {
        url: "/gm/handlers/update",
        method: HttpMethod.POST,
    },
}

export type IAPIUserInfo = (params: {user_id: number}) => {
    user_id: number,
    lover_id: number,
}

export type IAPIHandlersInfo = () => {
    info: {
        name: string,
        handlers: HandlerType[]
    }[]
}

export type IAPIUpdateHandler = (params: {
    name: string,
    label: string,
    input?: string,
    params: {
        user_id?: string,
        lover_id?: string,
    }
}) => {
    success: boolean
}