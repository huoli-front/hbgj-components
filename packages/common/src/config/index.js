const host = location.hostname;
// 开发环境
export const debug = process.env.NODE_ENV !== 'production';
// 测试环境，以域名区分 testhd.rsscc.cn, testvisa.rsscc.cn
export const isTest = host.indexOf('test') !== -1;
// 活动域名
export const isHD = /hd\.rsscc(\.cn|\.com)/.test(host);
// 签证域名
export const isVISA = /visa\.rsscc(\.cn|\.com)/.test(host);

// h5团队页面前缀
export const h5Prefix = debug || isTest ? 'https://wtest.133.cn' : 'https://h5.133.cn';

// 默认下载地址
// 航班默认下载地址
export const hangbanAppUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.flightmanager.view';
// 高铁默认下载地址
export const gaotieAppUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.gtgj.view';

// cookie 参数 测试环境与正式环境，使用rsscc.cn,
export const cookieOptions = {
  secure: !debug,
  expires: 30, // js-cookie expires 单位是天
  domain: host,
  path: '/'
};

// token 使用的cookie配置
const tokenOption = {};
Object.assign(tokenOption, cookieOptions, {
  domain: /\.rsscc\.cn$/.test(host) ? '.rsscc.cn' : host
});

export const tokenCookieOptions = tokenOption;

// 非安全模式cookie
export const cookieOptionsUnsecure = {
  expires: 30, // js-cookie expires 单位是天
  domain: host,
  path: '/'
};

export const sessionOptions = {
  secure: cookieOptions.secure,
  domain: host,
  path: cookieOptions.path
};

// 正式，测试，开发环境，都使用非安全cookie的session配置
export const sessionCookieUnsecure = {
  domain: host,
  path: cookieOptions.path
};


const config = {
  isHD,
  isVISA,
  isTest,
  debug,
  h5Prefix,
  hangbanAppUrl,
  gaotieAppUrl,
  cookieOptions,
  tokenCookieOptions,
  cookieOptionsUnsecure,
  sessionOptions,
  sessionCookieUnsecure
};
export default Object.freeze(config);
