<template>
    <div class="add-category-container">
      <h1>Add a New Category</h1>
      <form @submit.prevent="addCategory">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <button type="submit" class="add-category-btn">Add Category</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { toRaw } from 'vue';

  export default {
    name: 'AddCategory',
    data() {
      return {
        name: ''
      };
    },
    methods: {
      async addCategory() {
        try {
          console.log('name: ', this.name);
          await axios.post('http://localhost:8080/api/v1/categories/new', {
            name: toRaw(this.name),
          });
          this.$router.push('/');
        } catch (error) {
          console.error('Error adding category:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-category-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }
  label {
    margin-bottom: 5px;
  }
  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .add-category-btn {
    background: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
    border: none;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  