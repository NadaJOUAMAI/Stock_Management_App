import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home-Component.vue';
import ManageStocks from './components/Manage-Stocks.vue';
import Brands from './components/Brands-Component.vue';
import Products from './components/Products-Component.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/manage-stocks', component: ManageStocks },
  { path: '/brands', component: Brands },
  { path: '/products', component: Products },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const app = createApp(App);
app.use(router);
app.mount('#app');


