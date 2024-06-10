<template>
    <div id="app">
      <AppNavbar />
      <div class="categories-wrapper">
        <CategoriesMenu />
      </div>
      <div class="main-container">
        <router-view />
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
  .categories-wrapper {
    display: flex;
    justify-content: center;
  }
  .main-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  