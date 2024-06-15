<template>
  <div class="cart-item" @click="openModal">
    <div class="product-image-container">
      <img :src="productImage(item)" alt="Product Image" class="product-image">
    </div>
    <div class="item-info">
      <h3>{{ item.name }}</h3>
      <p>{{ item.price }}$</p>
      <div class="quantity-controls">
        <button @click.stop="decreaseQuantity">-</button>
        <span :class="{ 'quantity-exceeds': item.quantity > item.stockQuantity }">{{ item.quantity }}</span>
        <button @click.stop="increaseQuantity">+</button>
      </div>
      <button @click.stop="removeFromCart" class="remove-button">Remove Item</button>
      <div v-if="item.quantity > item.stockQuantity" class="stock-warning">
        <p style="color: red;">Quantity exceeds stock!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'CartItem',
  props: {
    item: Object
  },
  methods: {
    removeFromCart() {
      store.removeFromCart(this.item, true);
    },
    increaseQuantity() {
      store.addToCart(this.item);
    },
    decreaseQuantity() {
      store.decreaseQuantity(this.item);
    },
    openModal() {
      this.$emit('click', this.item);
    },
    productImage(product) {
      return product.image ? `data:image/jpeg;base64,${product.image}` : 'path/to/default/image.jpg';
    }
  }
};
</script>

<style scoped>
.cart-item {
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
.item-info {
  margin-top: 0.5rem;
}
.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.quantity-controls button {
  background-color: #ccc;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.quantity-controls span {
  margin: 0 1rem;
  font-size: 1.3rem;
}
.quantity-controls span.quantity-exceeds {
  color: red;
}
.remove-button {
  background: linear-gradient(270deg, #8a2be2 0%, #00c6ff 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
  margin-top: 1rem;
}
.stock-warning {
  margin-top: 0.5rem;
}
</style>
