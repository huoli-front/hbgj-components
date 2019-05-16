"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/cjs/common.min.js");
} else {
  module.exports = require("./dist/cjs/common.js");
}
