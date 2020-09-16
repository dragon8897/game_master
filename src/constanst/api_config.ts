import { HttpMethod } from "../utils/api"

// api 配置信息
export const APIConfig = {
    GetUserInfo: {
        url: "/client/user/info/",
        method: HttpMethod.GET,
    },
}

export type IAPIUserInfo = (params: {user_id: number}) => {
    user_id: number,
    lover_id: number,
    neighbour_id: number,
}
