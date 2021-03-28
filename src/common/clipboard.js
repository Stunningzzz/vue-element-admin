import Vue from 'vue'
import Clipboard from 'clipboard'

function clipboardSuccess() {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}


function clipboardError() {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}
export default function handleClipboard(text, event) {
  // 如果不想操作dom的话 传入第二个参数
  // text: 指定每次要复制的内容
  let clipboard = new Clipboard(event.currentTarget, {
    // text不能是字符串!!!
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
  })
  clipboard.on('error', () => {
    clipboardError()
  })
  // 在clipboard内部是通过listen(trigger,'click',e => onClick(e))监听点击事件的
  // 所以执行复制操作的其实是onClick函数 直接调用即可
  clipboard.onClick(event)
}
