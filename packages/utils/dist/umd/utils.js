/*!
 * 
 *         @hbgj/utils
 *         version: 1.0.0
 *         license: MIT
 *         author: yujindong <83575615@qq.com>
 *         home: http://www.yujindong.com/hbgj
 *       
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.Utils = {}));
}(this, function (exports) { 'use strict';

    var a = {
      name: 'a'
    };

    var b = {
      name: 'b'
    };

    exports.a = a;
    exports.b = b;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
