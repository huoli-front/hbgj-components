/* global system */
import config from "./config";
import jsonrpc from "jsonrpc-lite";
import { idGenerator } from "./utils";
import { send } from "./stream";
const searchStr = window.location.search;
const quickappDebug = searchStr.indexOf('quickappDebug=true') !== -1;
const quickappDebugTitle = 'quickapp';
// const methods = {};
const callbacks = {};

if (config.isQuickApp) {
    system.onmessage = function(message) {
        if(quickappDebug) {
            try {
                window.console.groupCollapsed(`${quickappDebugTitle} receive`);
            } catch (e) {
                window.console.log(`${quickappDebugTitle} receive`);
            }
            window.console.log(message);
            try {
                window.console.groupEnd();
            } catch (e) {
                window.console.log('log end');
            }
        }
        try {
            const result = jsonrpc.parse(message);
            let callback = callbacks[result.payload.id];
            switch (result.type) {
                case "success":
                    if (callback) {
                        callback(null, result.payload.result);
                    }
                    break;
                case "error":
                    callback(result.payload.error);
                    break;
                default:
                    break;
            }
            delete callbacks[result.payload.id];
        } catch (err) {
            throw jsonrpc.JsonRpcError.parseError({
                info: "服务端返回数据解析错误"
            });
        }
    };
}
function invoke(method, param) {
    return new Promise((resolve, reject) => {
        const request = jsonrpc.request(idGenerator.next().value, method, param);
        if(quickappDebug) {
            try {
                window.console.groupCollapsed(`${quickappDebugTitle} post`);
            } catch (e) {
                window.console.log(`${quickappDebugTitle} post`);
            }
            window.console.log(request.toString());
            try {
                window.console.groupEnd();
            } catch (e) {
                window.console.log('log end');
            }
        }

        if (config.isQuickApp) {
            send(request.toString());
            callbacks[request.id] = function(err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            };
        } else {
            const NotQuickAppError = jsonrpc.JsonRpcError.internalError({
                info: "当前页面不在快应用环境中"
            });
            reject(NotQuickAppError);
        }
    });
}
export default {
    config,
    isQuickApp: config.isQuickApp,
    invoke
};

