import {isApp} from '../util/index';
import { h5Prefix, debug } from '../config/index';
const appUrlPrefix = 'weixinhbgj://start';
const debugLogTitle = '@hbgj/common App.getHome';
/**
 * 生成app首页链接
 * @returns {string}
 */
function getHome(options = {}) {
  if(debug) {
    try {
      window.console.groupCollapsed(`${debugLogTitle} Params`);
    } catch (e) {
      window.console.log(`${debugLogTitle} Params`);
    }
    window.console.log('无');
    try {
      window.console.groupEnd();
    } catch (e) {
      window.console.log('log end.');
    }
  }
  let url;
  if(isApp() || options.useAppHref) {
    url = `${appUrlPrefix}?type=ticketmain`;
  } else {
    url = `${h5Prefix}/hangban/vue/jipiao/home`;
  }

  if(debug) {
    try {
      window.console.groupCollapsed(`${debugLogTitle} Result`);
    } catch (e) {
      window.console.log(`${debugLogTitle} Result`);
    }
    window.console.log(url);
    try {
      window.console.groupEnd();
    } catch (e) {
      window.console.log('log end');
    }
  }
  return url;
}


export default getHome;
