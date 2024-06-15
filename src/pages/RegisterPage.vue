<template>
    <div class="register-container">
      <h1>Register</h1>
      <form @submit.prevent="register" class="register-form">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="user.username" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" required>
        </div>
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="user.firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="user.lastName" required>
        </div>
        <div class="form-group">
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" id="phoneNumber" v-model="user.phoneNumber" required>
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" v-model="user.address" required>
        </div>
        <button type="submit" class="register-btn">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  import { registerUser } from '../../api';
  
  export default {
    name: 'RegisterPage',
    data() {
      return {
        user: {
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          address: ''
        }
      };
    },
    methods: {
      async register() {
        try {
          const newUser = await registerUser(this.user);
          console.log('User registered:', newUser);
          this.$router.push('/profile');
        } catch (error) {
          console.error('Error registering user:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
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
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .register-btn {
    width: 100%;
    background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
    border: none;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  