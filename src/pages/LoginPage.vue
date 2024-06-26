<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit" class="login-btn">Login</button>
      <button type="button" @click="goToRegister" class="register-btn">Register</button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
          username: this.username,
          password: this.password
        });
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        store.token = token;
        store.storeToken(token);
        store.user = response.data.userId;
        store.role = response.data.role;
        const response2 = await axios.get('http://localhost:8080/api/v1/users/' + store.user);
        
        
        console.log('USER DETAILS: ', response2);
        store.firstName = response2.data.firstName;
        store.lastName = response2.data.lastName;
        store.address = response2.data.address;
        store.phoneNumber = response2.data.phone;
        // store.username = response2.data.

        const intendedRoute = localStorage.getItem('intendedRoute');
        if (intendedRoute) {
          localStorage.removeItem('intendedRoute');
          this.$router.push(intendedRoute);
        } else {
          this.$router.push({ path: '/', query: { category: null } });
          // this.$router.push('/');
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.errorMessage = 'Invalid username or password.';
      }
    },
    goToRegister() {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
.login-btn, .register-btn {
  width: 100%;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}
.login-btn {
  background: linear-gradient(90deg, #00c6ff 0%, #0072ff 100%);
  margin-top: 10px;
}
.register-btn {
  background: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
  margin-top: 0px;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>
