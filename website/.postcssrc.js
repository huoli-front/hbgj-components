// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    // 'postcss-pxtorem': {
    //   rootValue: 37.5,
    //   propWhiteList: [],
    //   selectorBlackList: [],
    //   minPixelValue: 2
    // },
    "postcss-import": {},
    "postcss-url": {},
    'autoprefixer': { browsers: ['last 3 versions', 'iOS 9'] },
    'cssnano': {}
  }
};
