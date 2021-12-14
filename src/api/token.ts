const tokenKeys = {
  cookieKey: 'VUE_VITE_APP_TOKEN', // cookie 的key
  reqKey: 'Authorization', // 请求头的key
  resCheck: false, // token是否从响应头信息拿
  resKey: 'Authorization', // 响应头的key(若从响应头信息拿的话)
  remember: 'VUE_VITE_APP_REMBER', // cookie记住密码的key
  rememberDay: 30 // 记住密码的时间(day)
}

export default tokenKeys
