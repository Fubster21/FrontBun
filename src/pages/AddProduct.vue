<template>
  <div class="add-product-container">
    <h1>Add a New Product</h1>
    <form @submit.prevent="addProduct" class="add-product-form">
      <div class="form-group">
        <label for="name"><strong>Name:</strong></label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="description"><strong>Description:</strong></label>
        <input type="text" id="description" v-model="description" required>
      </div>
      <div class="form-group">
        <label for="color"><strong>Color:</strong></label>
        <input type="text" id="color" v-model="color" required>
      </div>
      <div class="form-group">
        <label for="price"><strong>Price:</strong></label>
        <input type="number" id="price" v-model="price" required>
      </div>
      <div class="form-group">
        <label for="stockQuantity"><strong>Stock Quantity:</strong></label>
        <input type="number" id="stockQuantity" v-model="stockQuantity" required>
      </div>
      <div class="form-group">
        <label for="image"><strong>Image:</strong></label>
        <input type="file" @change="onImageChange" />
      </div>
      <div class="form-group">
        <label for="categories"><strong>Categories:</strong></label>
        <div class="checkbox-group">
          <div v-for="category in categories" :key="category.id" class="checkbox-item">
            <input
              type="checkbox"
              :value="category.id"
              @change="updateSelectedCategories($event, category)"
            />
            <span>{{ category.name }}</span>
          </div>
        </div>
      </div>
      <button type="submit" class="add-product-btn">Add Product</button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { toRaw } from 'vue';

export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      description: '',
      color: '',
      price: '',
      stockQuantity: '',
      image: '',
      selectedCategories: [],
      categories: [],
      errorMessage: ''
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/categories/all');
      console.log('response.data: ', response.data)
      this.categories = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  },
  methods: {
    onImageChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result.split(',')[1];
      };
    },
    async addProduct() {
      console.log('===== ADDING NEW PRODUCT =====');
      try {
        console.log('selectedCategories:', this.selectedCategories)
        await axios.post('http://localhost:8080/api/v1/products/new', {
          name: this.name,
          description: this.description,
          color: this.color,
          price: this.price,
          stockQuantity: this.stockQuantity,
          image: this.image,
          categories: this.selectedCategories.map(category => ({ id: category.id, name: category.name }))
        });
        this.$router.push('/');
      } catch (error) {
        console.error('Error adding product:', error);
        this.errorMessage = 'Failed to add product.';
      }
    },
    updateSelectedCategories(event, category) {
      if (event.target.checked) {
        this.selectedCategories.push(toRaw(category));
      } else {
        this.selectedCategories = this.selectedCategories.filter(
          (item) => item.id !== category.id
        );
      }
      console.log("categories after update: ", this.selectedCategories);
    },
  },
};
</script>

<style scoped>
.add-product-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.add-product-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}
label {
  margin-bottom: 5px;
}
input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}
.add-product-btn {
  width: 100%;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
  margin-top: 10px;
}
.error-message {
  color: red;
  margin-top: 10px;
}
.checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.checkbox-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.checkbox-item input {
  margin-right: 5px;
}
.checkbox-item span {
  margin-left: 5px;
  white-space: nowrap;
}
</style>
