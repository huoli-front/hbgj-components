import { ua } from "./utils";
// 判断是否是快应用环境的正则
const exp = /^.*\shap\/.*$/;
const config = {
    isQuickApp: exp.test(ua)
};

export default config;
