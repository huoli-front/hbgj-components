/* global system */
import config from "./config";

export function send(message) {
  if (config.isQuickApp) {
    setTimeout(() => {
      system.postMessage(message);
    }, 0);
  }
}
