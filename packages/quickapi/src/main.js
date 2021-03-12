/* global system */
import config from "./config";
import jsonrpc from "jsonrpc-lite";
import { idGenerator } from "./utils";
import { send } from "./stream";
import { quickApiLog } from './utils';
// const methods = {};
const callbacks = {};
// 是否可以发送
let canSend = true;
// 发送队列
const messageQueue = [];

// 发送队列中的消息
function sendHandler() {
  if (messageQueue.length > 0) {
    canSend = false;
    system.onmessage = function (message) {
      system.onmessage = null;
      canSend = true;
      quickApiLog(Date.now(), "接收时间戳");
      quickApiLog(message, "receive");
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
    send(messageQueue.shift());
  }
}
// 将消息添加到发送队列
function addQueue(message) {
  quickApiLog(message, "添加到发送队列");
  messageQueue.push(message);
}
function invoke(method, param) {
  return new Promise((resolve, reject) => {
    const request = jsonrpc.request(idGenerator.next().value, method, param);
    if (config.isQuickApp) {
      callbacks[request.id] = function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      };
      addQueue(request.serialize());
      // send(request.serialize());
    } else {
      const NotQuickAppError = jsonrpc.JsonRpcError.internalError({
        info: "当前页面不在快应用环境中"
      });
      reject(NotQuickAppError);
    }
  });
}

// 轮询发送消息
setInterval(() => {
  if (canSend) {
    sendHandler();
  }
}, 0)
export default {
  config,
  isQuickApp: config.isQuickApp,
  invoke
};

