import { ElLoading } from 'element-plus'

let loadingInstance: any = null // Loading实例
let needLoadingRequestCount = 0 // 请求次数

function startLoading() {
  loadingInstance = ElLoading.service({
    text: '拼命加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0,0,0,0.7)'
  })
}
function endLoading() {
  loadingInstance.close()
}
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
