/* global system */
import config from "./config";

export function send(message) {
    if (config.isQuickApp) {
        system.postMessage(message);
    }
}
