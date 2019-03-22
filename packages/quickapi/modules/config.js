import { ua } from "./utils";
// 判断是否是快应用环境的正则
const exp = /^.*\shap\/.*$/;
const hbexp = /^.*\shap\/.*\scom\.hlth\.hbgj\.mini\/.*$/;
const gtexp = /^.*\shap\/.*\scom\.hlth\.gtgj\.mini\/.*$/;
const userAgentLower = ua.toLowerCase();
const isQuickApp = exp.test(userAgentLower);
const isHBGJ = hbexp.test(userAgentLower);
const isGTGJ = gtexp.test(userAgentLower);


const config = {
    isQuickApp,
    isHBGJ,
    isGTGJ
};

export default config;
