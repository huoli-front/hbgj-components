import {isApp} from '../util/index';
import { h5Prefix, debug } from '../config/index';
const appUrlPrefix = 'weixinhbgj://start';
const debugLogTitle = '@hbgj/common App.getCouponList';
/**
 * 生成优惠券列表页面链接
 * @returns {string}
 */
function getCouponList(options = {}) {
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
      window.console.log('log end');
    }
  }
  let url;
  if(isApp() || options.useAppHref) {
    url = `${appUrlPrefix}?type=couponslist`;
  } else {
    url = `${h5Prefix}/hangban/vue/individual/coupons`;
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


export default getCouponList;
