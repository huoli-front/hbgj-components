import {isApp, deleteIfExists} from '../util/index';
import { h5Prefix, debug } from '../config/index';
const appUrlPrefix = 'weixinhbgj://start';
const debugLogTitle = '@hbgj/common App.getTicketDetail';

function fixParams(params, options) {
  let result = {};
  if(!isApp()) {
    result = {
      v: 2,
      dcode: params.dcode || params.dep,
      acode: params.acode || params.arr
    };
    deleteIfExists(params, 'dep');
    deleteIfExists(params, 'arr');
    deleteIfExists(params, 'no');
    Object.assign(result, params);
  } else {
    result = {
      dep: params.dep || params.dcode,
      arr: params.arr || params.acode
    }
    // app内，国际参数
    if(options.type === 0) {
      params.segtype = 'inter';
    }
    deleteIfExists(params, 'dcode');
    deleteIfExists(params, 'acode');
    deleteIfExists(params, 'shareid');
    Object.assign(result, params);
  }
  return result;
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
  const finalParams = Object.freeze(fixParams(params, options));
  if(isApp()) {
    url = `${appUrlPrefix}?type=ticket&`;
  } else {
    url = `${h5Prefix}/hangban/vue/jipiao/search/${options.type === 1 ? 'domestic' : 'international'}/detail?`;
  }
  let query = new URLSearchParams(finalParams);
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
