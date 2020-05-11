# 网关调用工具

<p align="center">
    <a href="https://www.npmjs.com/package/@hbgj/gateway"><img alt="npm" src="https://img.shields.io/npm/v/@hbgj/gateway.svg"></a>
    <a href="https://www.npmjs.com/package/@hbgj/gateway"><img alt="npm" src="https://img.shields.io/npm/dt/@hbgj/gateway.svg?style=flat-square"></a>
    <a href="https://www.npmjs.com/package/@hbgj/gateway"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@hbgj/gateway.svg?style=flat-square"></a>
    <a href="https://travis-ci.org/huoli-front/hbgj-components"><img alt="Travis (.org)" src="https://img.shields.io/travis/huoli-front/hbgj-components.svg?style=flat-square"></a>
</p>

## 本组件依赖 Promise

引入 Promise 支持<a href="#webpack-promise">推荐做法</a>

## 暂时不支持个别组件按需加载，价值不大

## API

## Usage

1. `npm i -S @hbgj/gateway`
2. 引入 api，你的环境需要有 Promise 和`js-interceptor-lite` 库 支持

### 使用说明

```ecmascript 6
    // 你可能需@babel/polyfill 但不推荐此做法
    // import "@babel/polyfill";

    import gateway from "@hbgj/gateway";
```

### 机票详情 参数自动适配了 app 与 h5 可以使用二者的任意参数

```ecmascript 6

    import Common from "@hbgj/common";
    const { App } = Common;
    let params = _.extend({}, {
      dep: "出发地三字码",
      arr: "目的地三字码",
      date: "2019-12-01", // 去程
      fdate: "2019-12-11", // 返程
      analyseSourceEntry: "统计参数",
      no: '航班号，仅在app内需要并且必须使用',
      shareid: '仅在h5中需要并且必须使用'
    });
    // type  0 国际 1 国内
    const url = App.getTicketDetail(params, {type: 0 });
```

## webpack 管理项目 增加 promise 支持

<a name="webpack-promise"></a>

- 安装依赖  
  `npm i -S es6-promise`
- 修改 webpack 配置

```ecmascript 6

    plugins: [
        new webpack.ProvidePlugin({
            Promise: ['es6-promise', 'Promise']
        }),
    ]
```
