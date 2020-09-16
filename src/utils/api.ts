import Taro, { RequestTask } from '@tarojs/taro';

export enum HttpMethod {
    OPTIONS,
    GET,
    HEAD,
    POST,
    PUT,
    DELETE,
    TRACE,
    CONNECT,
}

export default class API {
    static request<P extends (...args: any) => any>(cfg: {url: string, method: HttpMethod}, ...args: Parameters<P>): RequestTask<ReturnType<P>>  {
        let m: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" = "GET"
        switch (cfg.method) {
            case HttpMethod.OPTIONS:
                m = "OPTIONS"
                break
            case HttpMethod.GET:
                m = "GET"
                break
            case HttpMethod.HEAD:
                m = "HEAD"
                break
            case HttpMethod.POST:
                m = "POST"
                break
            case HttpMethod.PUT:
                m = "PUT"
                break
            case HttpMethod.DELETE:
                m = "DELETE"
                break
            case HttpMethod.TRACE:
                m = "TRACE"
                break
            case HttpMethod.CONNECT:
                m = "CONNECT"
                break
        }
        return Taro.request({
            url: this._server + cfg.url,
            data: args.length > 0 ? args[0] : null,
            dataType: "json",
            method: m,
        })
    }

    static init(debug: boolean = true) {
        if (debug) {
            this._server = "http://localhost:9999"
        } else {
            this._server = "https://flybird.ml:9999"
        }
    }

    // 服务器地址
    private static _server: string = ""
}
