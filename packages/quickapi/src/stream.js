/* global system */
import config from "./config";

export function send(message) {
  window.console.log("quickapi-send:" + message);
  if (config.isQuickApp) {
    system.postMessage(message);
  }
}
