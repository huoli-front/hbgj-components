import MobileDetect from 'mobile-detect';

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const cache = {};

export default {
    getMobile() {
        if (!cache.mobile){
            cache.mobile = mobileDetect.mobile();
        }
        return cache.mobile;
    },
    getMobileVer() {
        if (!cache.mobile){
            cache.mobile = mobileDetect.mobile();
        }
        if (!cache.mobileVer){
            cache.mobileVer = mobileDetect.version(cache.mobile);
        }
        return cache.mobileVer;
    },

    getOS() {
        if (!cache.os){
            cache.os = mobileDetect.os();
        }
        return cache.os;
    },
    getTablet() {
        if (!cache.os){
            cache.os = mobileDetect.tablet();
        }
        return cache.os;
    },
    getBrowser() {
        if (!cache.browser){
            cache.browser = mobileDetect.userAgent();
        }
        return cache.browser;
    },

    getBrowserVer() {
        if (!cache.browser){
            cache.browser = mobileDetect.userAgent();
        }
        if (!cache.browserVer){
            cache.browserVer = mobileDetect.version(cache.browser);
        }
        return cache.browserVer;
    }

}
