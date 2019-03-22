<p align="center">
  <a href="https://travis-ci.com/huoli-front/hbgj-components"><img alt="Travis Status" src="https://travis-ci.com/huoli-front/hbgj-components.svg?branch=master"></a>
</p>
# 通用组件汇总

# 快应用与h5页面交互api h5端实现
# 请使用 1.1.x 以后的版本
## 通信协议 jsonrpc 2.0
## 本组件依赖 Promise 
引入Promise支持<a href="#webpack-promise">推荐做法</a>

## 使用方法
* es6模块引入（推荐方式)
```ecmascript 6
    // 你可能需@babel/polyfill 不推荐
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
