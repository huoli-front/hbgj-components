declare namespace HBGJ {
  interface QuickApiConfig {
    isQuickApp: boolean;
    isHBGJ: boolean;
    isGTGJ: boolean;
  }
  interface NativeApiInstance {
    config: QuickApiConfig;
    isQuickApp: boolean;
    invoke: (method: string, params: any) => Promise<any>;
  }
}

declare const QuickApi: HBGJ.NativeApiInstance;
export = QuickApi;
export as namespace QuickApi;
