import { HttpMethod } from "../utils/api"

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
        handlers: {
            label: string,
            params: string[],
        }[]
    }[]
}

export type IAPIUpdateHandler = (params: {
    name: string,
    label: string,
    params: {
        user_id?: string,
        lover_id?: string,
    }
}) => {
    success: boolean
}