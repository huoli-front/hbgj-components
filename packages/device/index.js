"use strict";

if (process.env.NODE_ENV === "production") {
    module.exports = require("./dist/cjs/device.min.js");
} else {
    module.exports = require("./dist/cjs/device.js");
}
