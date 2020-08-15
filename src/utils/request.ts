import Taro from "@tarojs/taro"
import { commonParame,requestConfig } from "../config/request"

// 封装请求
declare type Methohs = "GET" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT"
declare type Headers = { [key :string]:string}
declare type Datas = {method : Methohs; [key: string] : any;}
interface Options{
    url: string
    host?: string
    method?: Methohs
    data?: Datas
    header?: Headers
}

const MAINHOST = "127.0.0.1"

export class Request {
    // 登陆时的promise
    static loginReadyPromise: Promise<any> = Promise.resolve()

    // 正在登陆
    static isLoading: boolean = false

    // 导出的API对象
    static apiLists: { [key: string]: (data: Datas, method: Methohs) => any;} = {}

    // token
    static token: string = ''

    // 开始处理options
    static conbineOptions(opts, data: Datas, method: Methohs): Options {
        typeof opts ===  'string' && (opts = {url: opts})
        return {
            data: { ...commonParame, ...opts.data, ...data },
            method: opts.method || data.method || method || 'GET',
            url: `${opts.host || MAINHOST}${opts.url}`
        }
    }

    static getToken(){
        !this.token && (this.token = Taro.getStorageSync('token'))
        return this.token
    }


    // 登陆
    static login(){
        if (!this.isLoading) {
            this.loginReadyPromise = this.onLogining()
        }
        return this.loginReadyPromise
    }

    static onLogining(){
        this.isLoading = true
        return new Promise(async (resolve, reject) => {
            // 获取code
            const { code } = await Taro.login()

            const { data } = await Taro.request({
                url: `${MAINHOST}${requestConfig.loginUrl}`,
                data:{code: code}
            })

            if (data.code !== 0 || !data.data || !data.data.token) {
                return reject()
            } else {
                return resolve()
            }
        })

    }

    /** 
     * 基于 Taro.request 的 request 请求
     * 
     * */ 
    static async request(opts: Options) {
        
        // Taro.request 请求
        const res = await Taro.request(opts)

        // 请求失败
        if (res.data.code === 99999) {
            await this.login()
            return this.request(opts)
        }

        // 请求成功
        if (res.data) {
            return res.data
        }

        // 请求错误
        const edata = { ...res.data, err : (res.data && res.data.msg) || '网络错误 ~'}
        throw new Error(edata.err)

    }


    /** 
     * 创建请求函数
    */
   static creatRequests(opts: Options | string) : (data: Datas, method: Methohs) => {} {
       console.log('opts==>',opts)
       return async (data: Datas, method: Methohs = "GET") => {
           const _opts = this.conbineOptions(opts, data, method)
           const res = await this.request(_opts)
            return res
        }
   }

   /** 
    * 抛出API方法
   */
   static getApiList(requestConfig: {[key: string]: string }){
        if (!Object.keys(requestConfig).length) {
            return {}
        }
        Object.keys(requestConfig).forEach((key)=>{
            this.apiLists[key] = this.creatRequests(requestConfig[key])
        })
        return this.apiLists
   }


}

const Api = Request.getApiList(requestConfig)
export default Api


