<template>
    <div class="order-form">
      <h1>Place Your Order</h1>
      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="firstName"><strong>First name:</strong></label>
          <input type="text" id="firstName" v-model="firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName"><strong>Last name:</strong></label>
          <input type="text" id="lastName" v-model="lastName" required>
        </div>
        <div class="form-group">
          <label for="address"><strong>Address:</strong></label>
          <input type="text" id="address" v-model="address" required>
        </div>
        <div class="form-group">
          <label for="phone"><strong>Phone:</strong></label>
          <input type="tel" id="phone" v-model="phone" required>
        </div>
        <div class="total-amount">
          <strong>Total Amount:</strong> {{ cartTotalAmount }}$
        </div>
        <button type="submit" class="submit-btn">Submit Order</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import { store } from '../store.js';
  import axios from 'axios';
  
  export default {
    name: 'PlaceOrderPage',
    data() {
      return {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        errorMessage: '',
      };
    },
    computed: {
      cartTotalAmount() {
        return store.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
      },
    },
    created() {
      this.fillUserData();
    },
    watch: {
      'store.user': {
        handler() {
          this.fillUserData();
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
      fillUserData() {
        if (store.user) {
          this.firstName = store.firstName || '';
          this.lastName = store.lastName || '';
          this.address = store.address || '';
          this.phone = store.phone || '';
        }
      },
      async submitOrder() {
        console.log('Submitting order for user: ', store.user);
        const orderData = {
          dateFrom: new Date(),
          dateTo: new Date(),
          userId: store.user,
          orderState: 'PLACED',
          orderItems: store.cartItems.map(item => ({
            product: {
              id: item.id,
            },
            quantity: item.quantity,
          })),
        };
  
        console.log('Order data:', orderData);
  
        try {
          const response = await axios.post('http://localhost:8080/api/v1/orders/new', orderData);
          console.log('Order submitted:', response.data);
          this.resetForm();
          store.cartItems = [];
        //   this.$router.push({ name: 'OrderConfirmation', params: { orderId: response.data.id } });
        this.$router.push('/');
        } catch (error) {
          this.errorMessage = 'Failed to place order. Please try again.';
          console.error('Error placing order:', error);
          if (error.response) {
            console.error('Error response data:', error.response.data);
          }
        }
      },
      resetForm() {
        this.firstName = '';
        this.lastName = '';
        this.address = '';
        this.phone = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .order-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 1rem;
  }
  label {
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .submit-btn {
    width: 100%;
    border: none;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    background: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
    margin-top: 10px;
  }
  .total-amount {
    margin-top: 1rem;
  }
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  