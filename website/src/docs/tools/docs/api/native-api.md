# native api

## METHODS
组件方法

- [`<invoke>`](#native-api-invoke)
- [`<registerHandler>`](#native-api-registerhandler)

## INVOKE
invoke
```js
  import NativeApi from '@hbgj/native-api';
  
  // 调用客户端分享
  NativeApi.invoke("sharePage", {
    // shareInfo
  }, (err, result) => {
    
  });
  // 更新页面title
  NativeApi.invoke("updateTitle", {
    text: title
  });
  // 。。。

```

## registerHandler
register
```js
  import NativeApi from '@hbgj/native-api';
  NativeApi.registerHandler('methodName', (params) => {
    
  });
  // 。。。

```
