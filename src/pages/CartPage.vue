<template>
    <div>
      <h1>Cart</h1>
      <ul>
        <li v-for="item in cart" :key="item.id">{{ item.name }} - ${{ item.price }}</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CartPage',
    data() {
      return {
        cart: []
      };
    },
    created() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }
  }
  </script>
  