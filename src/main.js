// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import cookie from 'vue-cookie'
import store from '../vuex/store.js'

window.moxie = require('../node_modules/plupload/js/moxie');
window.plupload = require('../node_modules/plupload/js/plupload.dev');
import '../node_modules/qiniu-js/dist/qiniu'

window.md5 = require('../node_modules/md5/md5');
Vue.use(cookie);

Vue.config.productionTip = false;

require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('../node_modules/bootstrap/dist/js/bootstrap.min');
require('../node_modules/bootstrap-datetimepicker-master/js/bootstrap-datetimepicker.min');
require('../node_modules/bootstrap-datetimepicker-master/css/bootstrap-datetimepicker.min.css');
require('../node_modules/bootstrap-datetimepicker-master/js/locales/bootstrap-datetimepicker.zh-CN');

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
