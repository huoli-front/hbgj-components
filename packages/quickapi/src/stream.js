/* global system */
import config from "./config";
import { quickApiLog } from './utils';

export function send(message) {
  if (config.isQuickApp) {
    setTimeout(() => {
      quickApiLog(Date.now(), "发送时间戳");
      quickApiLog(message, "send");
      system.postMessage(message);
    }, 0);
  }
}
