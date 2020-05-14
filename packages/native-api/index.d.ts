declare namespace HBGJ {
  interface JSONRPC_ERROR {
    code: number;
    message: string;
  }
  type callbackFn = (err: any, result: any) => void;
  type handleFn = (result?: any) => void;
  type handleFn1 = (params: any) => void;
  type handleFn2 = (params: any, callback: any) => void;
  interface NativeApiInstance {
    PARSE_ERROR: JSONRPC_ERROR;
    INVALID_REQUEST: JSONRPC_ERROR;
    METHOD_NOT_FOUND: JSONRPC_ERROR;
    INVALID_PARAMS: JSONRPC_ERROR;
    INTERNAL_ERROR: JSONRPC_ERROR;
    invoke(method: string): void;
    invoke(method: string, params: any): void;
    invoke(method: string, params: any, callback: callbackFn): void;
    registerHandler(name: string, hanlder: handleFn): void;
    registerHandler(name: string, hanlder: handleFn1): void;
    registerHandler(name: string, hanlder: handleFn2): void;
  }
}

declare const NativeApi: HBGJ.NativeApiInstance;

export = NativeApi;
export as namespace NativeApi;
