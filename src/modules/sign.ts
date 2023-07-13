import md5 from 'js-md5';
/**
 * 随机生成n位十六进制字符串
 * @param n
 */
export const generateRandomHex = (n: number): string =>{
    let result = ''
    const characters = '0123456789ABCDEF'
    const length = characters.length

    for (let i = 0; i < n; i++) {
        result += characters.charAt(Math.floor(Math.random() * length))
    }
    return result
}

/**
 * 将字符串根据ASCII编码排序
 * @param str 需要排序的字符串
 */
export const sortStringByASCII = (str: string, asc: boolean = true): string =>{
    const arr = str.split('')
    arr.sort((a, b) => {
        const diff = a.charCodeAt(0) - b.charCodeAt(0);
        return asc ? diff : -diff;
    })
    return arr.join('')
}

/**
 * 对字符串进行md5加密
 * @param ticket
 * @param timestamp
 * @param salt
 */
export const generateSignature  = (ticket: string, timestamp: number, salt: string) => {
    const mix = `${ticket}${timestamp}`
    const sortedStr = sortStringByASCII(mix)
    const sign = md5(sortedStr + salt)
    return sign
}
