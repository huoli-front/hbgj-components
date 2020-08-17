import { ua } from "./utils";
// 判断是否是快应用环境的正则
const exp = /^.*\shap\/.*$/;
const huoliexp = /^.*\shap\/.*\scom\.hlth\/.*$/;
const hbexp = /^.*\shap\/.*\scom\.hlth\.hbgj\.mini\/.*$/;
const gtexp = /^.*\shap\/.*\scom\.hlth\.gtgj\.mini\/.*$/;
const xcexp = /^.*\shap\/.*\scom\.hlth\.xcfw\.min\/.*$/;
const userAgentLower = ua.toLowerCase();
const isQuickApp = exp.test(userAgentLower);
const isHuoLiQuickApp = huoliexp.test(userAgentLower);
const isHBGJ = hbexp.test(userAgentLower);
const isGTGJ = gtexp.test(userAgentLower);
const isXCGJ = xcexp.test(userAgentLower);


const config = {
    isQuickApp,
    isHuoLiQuickApp,
    isHBGJ,
    isGTGJ,
    isXCGJ
};

export default config;
