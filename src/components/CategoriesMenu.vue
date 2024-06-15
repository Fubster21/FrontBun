<template>
  <div class="categories-container">
    <button class="categories-btn" @click="toggleMenu">
      <i class="fas fa-bars"></i> Categories
    </button>
    <div v-if="menuVisible" class="overlay" @click="closeMenu"></div>
    <div :class="['sidebar-menu', { 'sidebar-menu-open': menuVisible }]">
      <img src="@/assets/logo.png" alt="FUBISS" class="logo" />
      <nav>
        <a href="#" @click.prevent="selectCategory(null)">All Categories</a>
        <a v-for="category in categories" :key="category.id" href="#" @click.prevent="selectCategory(category.id)">
          {{ category.name }}
        </a>
        <button v-if="isAdminOrSupplier" class="add-category-btn" @click="goToAddCategory">
          ++ Add New Category ++
        </button>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
  data() {
    return {
      menuVisible: false,
      categories: []
    };
  },
  computed: {
    isAdminOrSupplier() {
      return store.role === 'ADMIN' || store.role === 'SUPPLIER';
    }
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    closeMenu() {
      this.menuVisible = false;
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/categories/all');
        this.categories = response.data;
        console.log('Fetched categories:', this.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    selectCategory(categoryId) {
      console.log('Selected category ID:', categoryId);
      this.$emit('category-selected', categoryId);
      this.closeMenu();
    },
    goToAddCategory() {
      this.$router.push('/add-category');
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
.categories-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}
.categories-btn {
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  transition: background 5s ease;
}
.categories-btn i {
  margin-right: 10px;
}
.categories-btn:hover {
  transform: scale(1.05);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.sidebar-menu {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1001;
  transition: left 0.3s ease;
}
.sidebar-menu-open {
  left: 0;
}
.logo {
  width: 150px;
  margin: 20px 0;
}
nav {
  width: 100%;
}
.sidebar-menu a {
  display: block;
  width: 100%;
  padding: 15px 20px;
  color: black;
  text-decoration: none;
  box-sizing: border-box;
  transition: background 0.3s ease;
}
.sidebar-menu a:hover {
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  color: white;
}
.add-category-btn {
  background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px 0;
}
</style>
