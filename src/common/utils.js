import { title } from '@/settings';

let suffixTitle = title || 'Vue Element Admin';

export function getPageTitle(curPageTitle) {
  if (curPageTitle) {
    return `${curPageTitle} - ${suffixTitle}`;
  }
  return suffixTitle;
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    if (immediate) {
      let callnow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callnow) {
        return func.apply(this, arguments);
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(this, arguments);
      }, wait);
    }
  };
}
export function deepClone(target, hasCloned = new WeakMap()) {
  let type = typeof target;
  if (target && type === 'object') {
    if (hasCloned.has(target)) {
      return hasCloned.get(target);
    }
    let result = Array.isArray(target) ? [] : {};
    hasCloned.set(target, result);

    Reflect.ownKeys(target).forEach(key => {
      result[key] = deepClone(target[key], hasCloned);
    });

    return result;
  } else {
    return target;
  }
}
export function toggleClass(el, className) {
  el.classList.toggle(className);
}

export function parseTime(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  let regs = ['y', 'M', 'd', 'h', 'm', 's'];
  let cnts = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  for (let i = 0; i < regs.length; i++) {
    regs[i] = new RegExp(`${regs[i]}+`);
    cnts[i] = String(cnts[i]);
    if (cnts[i].length < 2) {
      cnts[i] = '0' + cnts[i];
    }
    fmt = fmt.replace(regs[i], $1 => String(cnts[i]).slice(-$1.length));
  }
  return fmt;
}
