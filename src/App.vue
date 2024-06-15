<template>
  <div id="app">
    <AppNavbar />
    <CategoriesMenu @category-selected="handleCategorySelected" />
    <div class="main-container">
      <router-view :selected-category="selectedCategory" />
    </div>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import CategoriesMenu from './components/CategoriesMenu.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
    CategoriesMenu,
  },
  data() {
    return {
      selectedCategory: null
    };
  },
  methods: {
    handleCategorySelected(categoryName) {
      console.log('Handling selected category name in App:', categoryName);
      this.selectedCategory = categoryName;
      
      // this.$router.push({name:'ProductCategory', params:{selectedCategoryId:categoryName}});
      this.$router.push({ name: 'ProductPage', query: { selectedCategoryId: categoryName } });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
