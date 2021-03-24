import checkPermission from '@/common/permission';

function check(el, { value: accessRoles }) {
  let hasPermission = checkPermission(accessRoles);
  if (!hasPermission) {
    el.parentNode?.removeChild(el);
  }
}

export default {
  // 在组件/元素插入其父元素的时候调用
  inserted(el, binding) {
    check(el, binding);
  },
  update(el, binding) {
    check(el, binding);
  },
};
