<template>
  <div class="product-card" @click="openModal">
    <div class="product-image-container">
      <img :src="productImage" alt="Product Image" class="product-image">
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.price }}$</p>
      <button @click.stop="addToCart" class="add-button">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  computed: {
    productImage() {
      return this.product.image ? `data:image/jpeg;base64,${this.product.image}` : 'path/to/default/image.jpg';
    }
  },
  methods: {
    addToCart() {
      store.addToCart(this.product);
    },
    openModal() {
      this.$emit('click', this.product);
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  cursor: pointer;
}
.product-image-container {
  width: 150px;
  height: 150px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.product-info {
  margin-top: 0.5rem;
}
.add-button {
  background: linear-gradient(270deg, #8a2be2 0%, #00c6ff 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}
</style>
