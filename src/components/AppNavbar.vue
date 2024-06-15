<template>
  <div>
    <nav class="navbar">
      <div class="navbar-left">
        <img src="@/assets/logo.png" alt="FUBISS" class="logo" />
      </div>
      <div class="navbar-center">
        <div class="search-container">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="search"
            placeholder="Search products..."
            class="search-bar"
          />
          <button class="search-button" @click="search">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <ul class="navbar-menu">
        <li>
          <router-link :to="profileLink"><i class="fas fa-user"></i> <span class="menu-text">My account</span></router-link>
        </li>
        <li>
          <router-link to="/"><i class="fas fa-home"></i> <span class="menu-text">Products</span></router-link>
        </li>
        <li>
          <router-link to="/cart">
            <i class="fas fa-shopping-cart"></i>
            <span class="menu-text">Cart</span>
            <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'AppNavbar',
  data() {
    return {
      searchQuery: ''
    };
  },
  computed: {
    cartItemCount() {
      return store.cartItemCount;
    },
    isAuthenticated() {
      return store.user != null;
    },
    profileLink() {
      return this.isAuthenticated ? '/profile' : '/login';
    }
  },
  methods: {
    search() {
      this.$router.push({ path: '/', query: { search: this.searchQuery } });
    }
  }
};
</script>

<style scoped>
@import '@fortawesome/fontawesome-free/css/all.css';

nav {
  background-color: #fff;
  padding: 10px 0;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
.navbar-left {
  display: flex;
  align-items: center;
}
.logo {
  margin-left: 15px;
  width: 150px;
}
.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 20px;
}
.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #007bff;
  border-radius: 25px;
  overflow: hidden;
  width: 100%;
}
.search-bar {
  padding: 10px;
  border: none;
  outline: none;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  color: #333;
  border-radius: 25px 0 0 25px;
}
.search-button {
  background-color: #fff;
  border: none;
  color: #007bff;
  padding: 10px;
  cursor: pointer;
}
.search-button i {
  font-size: 16px;
}
.navbar-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding-left: 10px;
}
.navbar-menu li {
  margin-left: 10px;
  margin-right: 20px;
  position: relative;
}
.navbar-menu li a {
  color: #007bff;
  text-decoration: none;
  display: flex;
  align-items: center;
  font-size: 16px;
}
.navbar-menu li a i {
  margin-right: 5px;
}
.menu-text {
  display: inline;
}
.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  position: absolute;
  top: -10px;
  left: 7px;
}
@media (max-width: 768px) {
  .menu-text {
    display: none;
  }
}
</style>
