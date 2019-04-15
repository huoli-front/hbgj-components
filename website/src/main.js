// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import 'normalize.css';
import './style.less';
import App from './App';
import router from './router';
import iview from 'iview/dist/iview';
import 'iview/dist/styles/iview.css';
import 'prismjs/themes/prism-tomorrow.css';
import { addGlobalClickInternalLink } from './utils/eventHelper';
window.domain = 'inews.gtimg.com';
Vue.use(iview);
Vue.config.productionTip = false;
/* eslint-disable no-new */

addGlobalClickInternalLink(router);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
