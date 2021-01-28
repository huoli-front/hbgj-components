export const ua = window.navigator.userAgent;
import { quickappDebug } from "./config";
function* generatorId() {
  let id = 1;
  while (true) {
    yield `quickapicallback${id++}`;
  }
}

export const idGenerator = generatorId();

/**
 *
 * @param {*} msg 消息内容
 * @param {*} type send: 像快应用发送 receive: 接收快应用消息
 */
export function quickApiLog(msg, type) {
  if (quickappDebug()) {
    window.console.log(`quickapp log: ${type} -> ${msg}`);
  }
}
