import {isApp, deleteIfExists} from '../util/index';
import { h5Prefix, debug } from '../config/index';
const appUrlPrefix = 'weixinhbgj://start';
const debugLogTitle = '@hbgj/common App.getTicketList';


function fixParams(params, options) {
  let result = {};
  const arrDate = params.fdate || params.arrdate;
  if(isApp() || options.useAppHref) {
    // 客户端多程参数
    if(options.mult) {
      result = {
        deps: params.scty || params.dcode,
        arrs: params.ecty || params.acode,
        dates: params.date,
        ismulti: 1
      };
      if(arrDate) {
        result.arrdate = arrDate;
      }

      deleteIfExists(params, 'scty');
      deleteIfExists(params, 'ecty');
      deleteIfExists(params, 'date');
    } else {
      result = {
        scty: params.scty || params.dcode,
        ecty: params.ecty || params.acode
      };
    }
    let fben = params.fben || params.cabin;
    if(fben) {
      result.fben = fben;
    }
  } else {
    if(options.type !== 0 || options.version === 2) {
      result = {
        v: 2,
        dcode: params.dcode || params.scty,
        acode: params.acode || params.ecty,
      }
    } else {
      result = {
        dep: params.dcode || params.scty,
        arr: params.acode || params.ecty,
      }
    }

    if(arrDate) {
      result.fdate = arrDate;
    }
    let cabin = params.cabin || params.fben;
    if(cabin) {
      result.cabin = cabin;
    }
  }
  // 已经手动处理的参数，删除原数据
  deleteIfExists(params, 'scty');
  deleteIfExists(params, 'ecty');
  deleteIfExists(params, 'dcode');
  deleteIfExists(params, 'acode');
  deleteIfExists(params, 'fben');
  deleteIfExists(params, 'cabin');
  deleteIfExists(params, 'fdate');
  deleteIfExists(params, 'arrdate');
  Object.assign(result, params);
  return result;
}

/**
 * 生成机票详情页面链接， h5环境，需要有options参数判断是国内还是国际 默认当成国际
 * @param params
 * @param options options.type 1: 国内
 * @param options options.useAppHref true 强制生成app链接
 * @param options options.mutl  1 多程 其他不传
 * @returns {string}
 */
function getTicketList(params, options = { type: 0, version: 2}) {
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
  const finalParams = fixParams(params, options);
  if(isApp() || options.useAppHref) {
    url = `${appUrlPrefix}?type=ticketlist&`;
  } else {
    url = `${h5Prefix}/hangban/vue/jipiao/search/${options.type === 1 ? 'domestic' : 'international'}/list?`;
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


export default getTicketList;
