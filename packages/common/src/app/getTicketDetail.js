import {isApp, deleteIfExists} from '../util/index';
import { h5Prefix, debug } from '../config/index';
const appUrlPrefix = 'weixinhbgj://start';
const debugLogTitle = '@hbgj/common App.getTicketDetail';

function fixParams(params) {
  if(!isApp()) {
    params.v = 2;
    params.dcode = params.dcode || params.dep;
    params.acode = params.acode || params.arr;
    deleteIfExists(params, 'dep');
    deleteIfExists(params, 'arr');
    deleteIfExists(params, 'no');
  } else {
    params.dep = params.dep || params.dcode;
    params.arr = params.arr || params.acode;
    deleteIfExists(params, 'dcode');
    deleteIfExists(params, 'acode');
    deleteIfExists(params, 'shareid');
  }
}
/**
 * 生成机票详情页面链接， h5环境，需要有options参数判断是国内还是国际 默认当成国际
 * @param params
 * @param options options.type 1: 国内
 * @returns {string}
 */
function getTicketDetail(params, options = { type: 0 }) {
  if(debug) {
    try {
      window.console.groupCollapsed(`${debugLogTitle} Params`);
    } catch (e) {
      window.console.log(`${debugLogTitle} Params`);
    }
    window.console.log(params);
    try {
      window.console.groupEnd();
    } catch (e) {
      window.console.log('log end');
    }

  }
  let url;
  fixParams(params);
  if(isApp()) {
    url = `${appUrlPrefix}?type=ticket&`;
  } else {

    url = `${h5Prefix}/hangban/vue/jipiao/search/${options.type === 1 ? 'domestic' : 'international'}/detail?`;
  }
  let query = new URLSearchParams(params);
  url = `${url}${query.toString()}`;

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


export default getTicketDetail;
