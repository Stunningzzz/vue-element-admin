
/** 概念: 包装函数是指 debounce的返回值函数 原函数指的是传入的参数fn
 * 
 */

function debounce(func,wait,immediate){
  let timeout;
  return function (){
    clearTimeout(timeout);
    if (immediate) {
      let callnow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callnow) {
        return func.apply(this,arguments);
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(this,arguments);
      }, wait);
    }
  }
}