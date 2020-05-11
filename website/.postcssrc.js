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
    'autoprefixer': require('autoprefixer'),
    'cssnano': {}
  }
};
