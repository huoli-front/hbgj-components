import {isApp, deleteIfExists} from '../util/index';
import { h5Prefix, debug } from '../config/index';
const appUrlPrefix = 'weixinhbgj://start';
const debugLogTitle = '@hbgj/common App.getTicketList';


function fixParams(params) {
  let result = {};
  if(!isApp()) {
    result = {
      v: 2,
      dcode: params.dcode || params.scty,
      acode: params.acode || params.ecty,
    }
    let cabin = params.cabin || params.fben;
    if(cabin) {
      result.cabin = cabin;
    }
    deleteIfExists(params, 'scty');
    deleteIfExists(params, 'ecty');
    deleteIfExists(params, 'fben');
    Object.assign(result, params);
  } else {
    result = {
      scty: params.scty || params.dcode,
      ecty: params.ecty || params.acode
    }
    let fben = params.fben || params.cabin;
    if(fben) {
      result.fben = fben;
    }
    deleteIfExists(params, 'dcode');
    deleteIfExists(params, 'acode');
    deleteIfExists(params, 'cabin');
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
function getTicketList(params, options = { type: 0 }) {
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
    url = `${appUrlPrefix}?type=ticketlist&`;
  } else {
    url = `${h5Prefix}/hangban/vue/jipiao/search/${options.type === 1 ? 'domestic' : 'international'}/list?`;
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


export default getTicketList;
