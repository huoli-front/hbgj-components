# `@hbgj/native-api`


# Native与h5页面交互api h5端实现  

<p align="center">
    <a href="https://www.npmjs.com/package/@hbgj/native-api"><img alt="npm" src="https://img.shields.io/npm/v/@hbgj/native-api.svg"></a>
    <a href="https://www.npmjs.com/package/@hbgj/native-api"><img alt="npm" src="https://img.shields.io/npm/dt/@hbgj/native-api.svg?style=flat-square"></a>
    <a href="https://www.npmjs.com/package/@hbgj/native-api"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@hbgj/native-api.svg?style=flat-square"></a>
    <a href="https://travis-ci.org/huoli-front/hbgj-components"><img alt="Travis (.org)" src="https://img.shields.io/travis/huoli-front/hbgj-components.svg?style=flat-square"></a>
</p>  

## 通信协议 jsonrpc 2.0
## 本组件依赖 js-cookie

## Usage
    1. `npm i @hbgj/native-api`
```ecmascript 6
    
    import NativeApi from "@hbgj/native-api";

    NativeApi.invoke("method", { param1: 1, param2: 2}, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            console.log(result)
        }
    });
```
