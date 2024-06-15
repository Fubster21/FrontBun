import { reactive } from 'vue';
import axios from 'axios';

export const store = reactive({
  cartItems: [],
  token: null,
  user: null,
  role: null,
  userDetails: null,
  isAuthenticated: false,
  firstName: null,
  lastName: null,

  addToCart(product) {
    console.log("Adding product to cart:", product);
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      console.log("Product already in cart. Increasing quantity.", existingProduct);
      existingProduct.quantity++;
    } else {
      console.log("Product not in cart. Adding new product.");
      this.cartItems.push({ ...product, quantity: 1 });
    }
    console.log("Current cart items:", this.cartItems);
  },

  decreaseQuantity(product) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity--;
      } else {
        this.removeFromCart(product, true);
      }
    }
  },

  removeFromCart(product, removeAll = false) {
    if (removeAll) {
      this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    }
  },

  get cartItemCount() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  },

  async login(username, password) {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
        username,
        password
      });
      this.token = response.data.token;
      this.storeToken(this.token);
      this.user = response.data.userId;
      const usersDetailsResponse = await axios.get('http://localhost:8080/api/v1/user/' + this.user);
      console.log('USER DETAILS RESPONSE: ', usersDetailsResponse);
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      await this.fetchUser();
      this.isAuthenticated = true;
    } catch (error) {
      console.error('Error during login:', error);
    }
  },

  async fetchUser() {
    if (this.token) {
      try {
        console.log('http://localhost:8080/api/v1/user/' + this.user);
        const response = await axios.get('http://localhost:8080/api/v1/user/' + this.user);
        // this.user = response.data;
        // this.role = response.data.role;
        console.log('User object:', response);
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Error fetching user:', error);
        this.logout();
      }
    }
  },

  logout() {
    this.token = null;
    this.user = null;
    this.role = null;
    this.isAuthenticated = false;
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  },

  storeToken(token) {
    localStorage.setItem('token', token);
  },

  fetchToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.token = token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      this.fetchUser();
    }
  }
});

store.fetchToken();
