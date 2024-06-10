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
        <li><router-link to="/"><i class="fas fa-home"></i> <span class="menu-text">Products</span></router-link></li>
        <li><router-link to="/cart"><i class="fas fa-shopping-cart"></i> <span class="menu-text">Cart</span></router-link></li>
        <li><router-link to="/profile"><i class="fas fa-user"></i> <span class="menu-text">User Menu</span></router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    search() {
      this.$router.push({ path: '/', query: { search: this.searchQuery } });
    }
  }
}
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
}
.navbar-menu li {
  margin-left: 20px;
}
.navbar-menu li a {
  color: #333;
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
@media (max-width: 768px) {
  .menu-text {
    display: none;
  }
}
</style>
