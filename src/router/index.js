import { createRouter, createWebHistory } from 'vue-router';
import CartPage from '../pages/CartPage.vue';
import ProductPage from '../pages/ProductPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import AddProduct from '../pages/AddProduct.vue';
import AddCategory from '../pages/AddCategory.vue';
import PlaceOrderPage from '../pages/PlaceOrderPage.vue';
import { store } from '../store.js';
import axios from 'axios';

const routes = [
  { path: '/', component: ProductPage, name: 'ProductPage', props: true },
  { path: '/cart', component: CartPage },
  { path: '/profile', component: ProfilePage, meta: { requiresAuth: true } },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/add-product', component: AddProduct, meta: { requiresAdminOrSupplier: true } },
  { path: '/add-category', component: AddCategory, meta: { requiresAdminOrSupplier: true } },
  { path: '/place-order', component: PlaceOrderPage, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token');
  console.log("Before routing...");
  if (token) {
    console.log("Adding token bearer...");
    store.token = token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (!store.user) {
      console.log("Fetching user...");
      await store.fetchUser();
    }
    if (to.matched.some(record => record.meta.requiresAuth) && !store.user) {
      console.log("Redirecting to login...");
      next('/login');
    } else if (to.matched.some(record => record.meta.requiresAdminOrSupplier) && !(store.role === 'ADMIN' || store.role === 'SUPPLIER')) {
      console.log("Role: " + store.role);
      console.log("Redirecting to main page...");
      next('/');
    } else {
      console.log("Redirecting...");
      next();
    }
  } else {
    console.log("NO token bearer to add...");
    if (to.matched.some(record => record.meta.requiresAuth || record.meta.requiresAdminOrSupplier)) {
      console.log("Redirecting to login...");
      localStorage.setItem('intendedRoute', to.fullPath);
      next('/login');
    } else {
      console.log("Redirecting...");
      next();
    }
  }
});

export default router;
