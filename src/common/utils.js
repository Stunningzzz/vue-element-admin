
import {title} from '@/settings';

let suffixTitle = title || 'Vue Element Admin';

export function getPageTitle(curPageTitle){
  if (curPageTitle) {
    return `${curPageTitle} - ${suffixTitle}`
  }
  return suffixTitle;
}

