import 'normalize.css';
import '@/styles/main.scss';
import Vue from 'vue';
import '@/components/globals';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});
