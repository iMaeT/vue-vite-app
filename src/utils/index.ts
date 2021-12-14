import { AxiosResponse } from 'axios'

/**
 * 对象数组深拷贝
 * @param {Array,Object} source 需要深拷贝的对象数组
 * @param {Array} noClone 不需要深拷贝的属性集合
 */
export function deepClone(source: any, noClone: string[] = []): any {
  if (!source || (source && typeof source !== 'object')) {
    throw new Error('error arguments deepClone')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys: string) => {
    if (source[keys] && typeof source[keys] === 'object' && noClone.indexOf(keys) === -1) {
      targetObj[keys] = deepClone(source[keys], noClone)
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
// eslint-disable-next-line
export function findIndex(ary: Array<any>, fn: Fn): number {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item: any, i: number, ary: Array<any>) => {
    const ret: any = fn(item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  return index
}

/**
 * 生成随机字符串
 */
export function toAnyString() {
  const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0
    const v: number = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString()
  })
  return str
}

/**
 ** 字符串加密
 * @param {string} code 加密的文本
 * @returns {string}
 */
export function compileStr(code: string) {
  let c = String.fromCharCode(code.charCodeAt(0) + code.length)
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
  }
  return escape(c)
}

/**
 ** 字符串解密
 * @param {string} code 解密的文本
 * @returns {string}
 */
export function uncompileStr(code: string) {
  code = unescape(code)
  let c = String.fromCharCode(code.charCodeAt(0) - code.length)
  for (let i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}

/**
 * 截取URL参数
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string) {
  const search: string = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value: string | number, validList: string[] | number[]): boolean {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * 将时间解析为字符串
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time: any, cFormat: string) {
  if (arguments.length === 0 || time === null || time === undefined) {
    return null
  }
  if (time === '-') {
    return '-'
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    // 处理像2020-09-22含有 '-' 的格式，将 '-'替换为 '/',
    // ios与IE 不能识别 '-'格式的日期
    if (typeof time === 'string' && time.indexOf('-') !== -1) {
      time = time.replace(/-/g, '/')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // 请注意: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 将过去的时间转换成文字
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const dstamp = +new Date(time)
  const now = Date.now()

  const diff = (now - dstamp) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    )
  }
}

/**
 * 导出
 * @response {objec} 接收从接口返回的response数据
 */
export function exportFile(response: AxiosResponse) {
  const fileName = decodeURI(
    response.headers['content-disposition']
      ? response.headers['content-disposition'].split(';')[1].split('=')[1]
      : 'test'
  )
  const blob = new Blob([response.data as Blob], {
    type: response.headers['content-type']
  })
  if (typeof (window.navigator as any).msSaveBlob !== 'undefined') {
    ;(window.navigator as any).msSaveBlob(blob, fileName)
  } else {
    const blobURL = window.URL.createObjectURL(blob) // 将blob对象转为一个URL
    const tempLink = document.createElement('a') // 创建一个a标签
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', fileName) // 给a标签添加下载属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    document.body.appendChild(tempLink) // 将a标签添加到body当中
    tempLink.click() // 启动下载
    document.body.removeChild(tempLink) // 下载完毕删除a标签
    window.URL.revokeObjectURL(blobURL)
  }
}

/**
 * 对比两个数组是否一致
 * @a {array}
 * @b {array}
 */
export function valueEquals(a: any[], b: any[]): boolean {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

/**
 * IE浏览器版本
 */
export function IEVersion() {
  const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE<11浏览器
  const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
  const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    const fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 7
    } else if (fIEVersion === 8) {
      return 8
    } else if (fIEVersion === 9) {
      return 9
    } else if (fIEVersion === 10) {
      return 10
    } else {
      return 6 // IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' // edge
  } else if (isIE11) {
    return 11 // IE11
  } else {
    return -1 // 不是ie浏览器
  }
}

/**
 * 驼峰转下划线
 * @val {string} 需要转换的字符串
 */
export function humpToUnderline(val: string) {
  return val.replace(/([A-Z])/g, '_$1').toLowerCase()
}
