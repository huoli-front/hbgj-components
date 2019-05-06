import {isApp} from '../util/index';
import { h5Prefix } from '../config/index';
const appUrlPrefix = 'weixinhbgj://start';

/**
 * 生成机票列表页面链接， h5环境，需要有options参数判断是国内还是国际 默认当成国际
 * @param params
 * @param options options.type 1: 国内
 * @returns {string}
 */
function getTicketList(params, options = { type: 0 }) {
    let url;

    if(isApp()) {
        // 由于 客户端和h5服务页面接口不一致，app的仓位是fben h5的仓位是cabin
        if(params.cabin) {
            params.fben = params.cabin;
            delete params.cabin;
        }
        url = `${appUrlPrefix}?type=ticketlist&`;
    } else {
        url = `${h5Prefix}/hangban/vue/jipiao/search/${options.type === 1 ? 'domestic' : 'international'}/list?`;
    }
    let query = new URLSearchParams(params);
    url = `${url}${query.toString()}`;

    return url;
}


export default {
    getTicketList
}
