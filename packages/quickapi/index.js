"use strict";

if (process.env.NODE_ENV === "production") {
    module.exports = require("./cjs/QuickApi.min.js");
} else {
    module.exports = require("./cjs/QuickApi.js");
}
