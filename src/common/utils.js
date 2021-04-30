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

export function toggleClass(el,className) {
  el.classList.toggle(className);
}