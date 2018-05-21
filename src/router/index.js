import Vue from 'vue';
import Router from 'vue-router';
import Product from '@/components/product';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:productId',
      name: 'Product',
      component: Product,
    },
  ],
});
