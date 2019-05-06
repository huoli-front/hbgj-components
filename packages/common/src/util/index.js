import cookie from 'js-cookie';
const ua = window.navigator.userAgent;

// 是否是app环境
export function isApp () {
    const appName = cookie.get('appName');

    if (/gtgj|hbgj/i.test(appName)) {
        return true;
    } else {
        return false;
    }
}


// 是否在微信中
export function isWechat () {
    return /micromessenger/i.test(ua);
}

export default {
    isApp,
    isWechat
}
