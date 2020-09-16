import Taro, { RequestTask } from '@tarojs/taro';

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
}

export default class API {
    static request<P extends (...args: any) => any>(cfg: {url: string, method: HttpMethod}, ...args: Parameters<P>): RequestTask<P>  {
        return Taro.request({
            url: this._server + cfg.url,
            data: args.length > 0 ? args[0] : null,
            header: {
                'Content-Type': 'application/json',
            },
            method: "GET",
        })
    }

    // 服务器地址
    private static _server: string = ""

}
