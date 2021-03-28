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
  console.log('target --- ',event.currentTarget);
  const clipboard = new Clipboard(event.currentTarget, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
  console.log(clipboard);
  clipboard.onClick(event)
}
