import { ua } from "./utils";
// 判断是否是快应用环境的正则
const exp = /^.*\shap\/.*$/;
// 公司内部快应用环境
const huoliexp = /^.*\shap\/.*\scom\.hlth\/.*$/;
// 航班快应用环境
const hbexp = /^.*\shap\/.*\scom\.hlth\.hbgj\.mini\/.*$/;
// 高铁快应用环境
const gtexp = /^.*\shap\/.*\scom\.hlth\.gtgj\.mini\/.*$/;
// 行程助手快应用环境
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

export const quickappDebug = () => {
  return window.location.href.indexOf('debug=true') !== -1;
} 
export default config;
