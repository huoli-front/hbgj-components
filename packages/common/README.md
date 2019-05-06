# 公共功能汇总

<p align="center">
    <a href="https://www.npmjs.com/package/@hbgj/common"><img alt="npm" src="https://img.shields.io/npm/v/@hbgj/common.svg"></a>
    <a href="https://www.npmjs.com/package/@hbgj/common"><img alt="npm" src="https://img.shields.io/npm/dy/@hbgj/common.svg?style=flat-square"></a>
    <a href="https://www.npmjs.com/package/@hbgj/common"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@hbgj/common.svg?style=flat-square"></a>
    <a href="https://travis-ci.org/huoli-front/hbgj-components"><img alt="Travis (.org)" src="https://img.shields.io/travis/huoli-front/hbgj-components.svg?style=flat-square"></a>
</p>  

## 本组件依赖 Promise 
引入Promise支持<a href="#webpack-promise">推荐做法</a>
## 暂时不支持个别组件按需加载，价值不大
## Usage
    1. `npm i @hbgj/common`
    2. 引入api，你的环境需要有Promise支持
```ecmascript 6
    // 你可能需@babel/polyfill 但不推荐此做法
    // import "@babel/polyfill";
    
    import Common from "@hbgj/common";
    const { Config, Util, App } = Common;
    let params = _.extend({}, {
          interType: 0,  // 0国际 1国内
          scty: "PEK",
          ecty: "SHA",
          date: "2019-12-01",
          fdate: "2019-12-11",
          cabin: "4" // // 4 经济舱，7 公务舱
        });
    // type  0 国际 1 国内
    const url = App.getTicketList(params, {type: 0 });

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