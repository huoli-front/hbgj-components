# 快应用与h5页面交互api h5端实现  

<p align="center">
    <a href="https://www.npmjs.com/package/@hbgj/quickapi"><img alt="npm" src="https://img.shields.io/npm/v/@hbgj/quickapi.svg"></a>
    <a href="https://www.npmjs.com/package/@hbgj/quickapi"><img alt="npm" src="https://img.shields.io/npm/dt/@hbgj/quickapi.svg?style=flat-square"></a>
    <a href="https://www.npmjs.com/package/@hbgj/quickapi"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@hbgj/quickapi.svg?style=flat-square"></a>
    <a href="https://travis-ci.com/github/huoli-front/hbgj-components">
    <img alt="Travis (.com)" src="https://img.shields.io/travis/com/huoli-front/hbgj-components?style=flat-square"></a>
</p>  

# 请使用 1.1.x 以后的版本
## 通信协议 jsonrpc 2.0
## 本组件依赖 Promise 
引入Promise支持<a href="#webpack-promise">推荐做法</a>

## Usage
    1. `npm i @hbgj/quickapi`
    2. 引入api，你的环境需要有Promise支持
```ecmascript 6
    // 你可能需@babel/polyfill 但不推荐此做法
    // import "@babel/polyfill";
    
    import QuickApi from "@hbgj/quickapi";

    QuickApi.invoke("method", { param1: 1, param2: 2})
        .then((result) => {
            console.log(result);
        }).catch((err) => {
            console.log(err);   
        })
```
  
  
## webpack管理项目 增加promise支持
<a name="webpack-promise"></a>

* 安装依赖  
` npm i -S es6-promise `
* 修改webpack配置
```ecmascript 6

    plugins: [
        new webpack.ProvidePlugin({
            Promise: ['es6-promise', 'Promise']
        }),
        ...
    ]
```
