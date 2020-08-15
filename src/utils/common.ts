/** 
 * 共用函数
*/

export function repeat(str: string = '0', times: number): string {
    return (new Array(times + 1)).join(str)
}
// 时间前面 +0 
export function pad(num: number, maxLength: number = 2): string {
    return repeat('0', maxLength - num.toString().length) + num
}

// 全局的公共变量
export let globalData: any = {

}

// 时间格式转换
export function formatTime(time: Date): string {
    return `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}.${pad(time.getMilliseconds(), 3)}`
}

