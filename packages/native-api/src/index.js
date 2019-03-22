import cookie from 'js-cookie';

const JSON_RPC_ERROR = {
    PARSE_ERROR: {
        code: -32700,
        message: 'NativeAPI: Parse error',
    },
    INVALID_REQUEST: {
        code: -32600,
        message: 'NativeAPI: Invalid Request',
    },
    METHOD_NOT_FOUND: {
        code: -32601,
        message: 'NativeAPI: Method not found',
    },
    INVALID_PARAMS: {
        code: -32602,
        message: 'NativeAPI: Invalid params',
    },
    INTERNAL_ERROR: {
        code: -32603,
        message: 'NativeAPI: Internal error',
    },
};

const methods = {};
const callbacks = {};
let idCounter = 1;
const NBridge = {};
const send = function (message) {
    // window.console.log("javascript -> native: " + JSON.stringify(message));
    window.NativeAPI.sendToNative(JSON.stringify(message));
};

const executeMethod = function (message) {
    const fn = methods[message.method];

    if (!fn) {
        send({
            jsonrpc: '2.0',
            error: JSON_RPC_ERROR.METHOD_NOT_FOUND,
            id: message.id || null,
        });
        return;
    }
    setTimeout(function () {
        try {
            fn(message.params, function (err, result) {
                if (!message.id) {
                    return;
                }

                if (err) {
                    send({
                        jsonrpc: '2.0',
                        error: {
                            code: err.code,
                            message: err.message,
                        },
                        id: message.id,
                    });
                } else {
                    send({
                        jsonrpc: '2.0',
                        result: result,
                        id: message.id,
                    });
                }
            });
        } catch (ex) {
            send({
                jsonrpc: '2.0',
                error: {
                    code: ex.code || -32000,
                    message: ex.message,
                },
                id: message.id,
            });
        }
    }, 0);
};

const handleCallback = function (message) {
    const callback = callbacks[message.id];
    callbacks[message.id] = null;

    if (!callback) {
        return;
    }
    setTimeout(function () {
        callback(message.error || null, message.result);
    }, 0);
};

const handleInternalError = function (message) {
    try {
        message = JSON.parse(message);
    } catch (ex) {
        return;
    }
    if (message.id) {
        handleCallback({
            jsonrpc: '2.0',
            error: JSON_RPC_ERROR.INTERNAL_ERROR,
            id: message.id,
        });
    }
};

window.NativeAPI = window.NativeAPI || {};

if (!window.NativeAPI.sendToNative) {
    (function () {
        const buffer = [];

        const timer = setTimeout(function () {
            buffer.forEach(handleInternalError);
            window.NativeAPI.sendToNative = handleInternalError;
        }, 6000);

        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            clearTimeout(timer);
            setTimeout(function () {
                buffer.forEach(window.NativeAPI.sendToNative);
            }, 10);
        }, false);

        window.NativeAPI.sendToNative = function (message) {
            // standalone supported
            if (cookie && cookie.get('appVer')) {
                window.alert('OpenetNativeAPI://' + message);
            } else {
                buffer.push(message);
            }
        };

        // standalone supported
        if (cookie) {
            const appName = cookie.get('appName');

            // 加了 cookie 的版本号
            // 高铁 3.5
            // 航班 5.2
            // 航班上刷新有问题，屏蔽 "openetjs://start?type=native-api"
            // window.location.href = "openetjs://start?type=native-api";
            // 高铁上面调用这个 scheme url 之后无法执行后续的 script 标签
            // window.location.href = "gtgj://start?type=native-api";
            if (!/gtgj|hbgj/i.test(appName)) {
                clearTimeout(timer);
                window.NativeAPI.sendToNative = handleInternalError;
            }
        }
    })();
}

window.NativeAPI.sendToJavaScript = function (message) {
    // window.console.log("native -> javascript: " + message);
    try {
        message = JSON.parse(message);
    } catch (ex) {
        return send({
            jsonrpc: '2.0',
            error: JSON_RPC_ERROR.PARSE_ERROR,
            id: null,
        });
    }

    if (message.method) {
        executeMethod(message);
    } else if (message.id) {
        handleCallback(message);
    }
};

NBridge.registerHandler = function (name, fn) {
    methods[name] = fn;
};

NBridge.invoke = function (method, params, callback) {
    const message = {
        jsonrpc: '2.0',
        method: method,
        params: params,
    };
    let id;

    if (callback) {
        id = 'jsonp_' + idCounter;
        idCounter++;

        callbacks[id] = callback;
        message.id = id;
    }
    send(message);
};

Object.keys(JSON_RPC_ERROR).forEach(function (key) {
    NBridge[key] = JSON_RPC_ERROR[key];
});

export default NBridge;

