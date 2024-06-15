<template>
  <div>
    <h1>Cart</h1>
    <div v-if="isCartEmpty">Your cart is empty.</div>
    <div v-else>Total items in cart: {{ store.cartItemCount }}</div>
    <div class="cart-list">
      <CartItem
        v-for="item in store.cartItems"
        :key="item.id"
        :item="item"
        @click="openModal(item)"
      />
    </div>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content animate-modal-in" ref="modalContent">
        <img :src="productImage(selectedProduct)" alt="Product Image" class="modal-image" />
        <div class="modal-info">
          <h2>{{ selectedProduct.name }}</h2>
          <p><strong>Description:</strong> {{ selectedProduct.description }}</p>
          <p><strong>Color:</strong> {{ selectedProduct.color }}</p>
          <p><strong>Stock Quantity:</strong> {{ selectedProduct.stockQuantity }}</p>
          <p><strong>Price:</strong> {{ selectedProduct.price }}$</p>
          <div v-if="selectedProduct.quantity > selectedProduct.stockQuantity" class="stock-warning">
            <p style="color: red;">
              The number of this item exceeds the maximum stock available.
              <br />
              Stock: {{ selectedProduct.stockQuantity }}, In Cart: {{ selectedProduct.quantity }}
            </p>
          </div>
          <div class="controls-container">
            <div class="total-amount"><strong>Total Amount:</strong> {{ totalAmount }}$</div>
            <div class="quantity-controls">
              <button @click="decreaseQuantity(selectedProduct)">-</button>
              <span>{{ selectedProduct.quantity }}</span>
              <button @click="increaseQuantity(selectedProduct)">+</button>
            </div>
            <button @click="removeFromCart(selectedProduct)" class="remove-from-cart-btn">Remove Item</button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-summary" v-if="!isCartEmpty">
      <p><strong>Total Amount:</strong> {{ cartTotalAmount }}$</p>
      <div v-if="stockWarning" class="stock-warning">
        <p style="color: red;">
          The number of one or more items exceeds the maximum stock available.
        </p>
      </div>
      <button @click="placeOrder" class="place-order-btn">Place Order</button>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';
import CartItem from '../components/CartItem.vue';
import { useRouter } from 'vue-router';

export default {
  name: 'CartPage',
  components: {
    CartItem
  },
  data() {
    return {
      showModal: false,
      selectedProduct: null,
      stockWarning: false,
    };
  },
  computed: {
    totalAmount() {
      return this.selectedProduct ? this.selectedProduct.quantity * this.selectedProduct.price : 0;
    },
    cartTotalAmount() {
      return store.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    },
    isCartEmpty() {
      return store.cartItems.length === 0;
    }
  },
  methods: {
    openModal(product) {
      this.selectedProduct = product;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    removeFromCart(product) {
      store.removeFromCart(product, true);
      this.closeModal();
    },
    increaseQuantity(product) {
      if (product.quantity < product.stockQuantity) {
        store.addToCart(product);
      }
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        store.decreaseQuantity(product);
      } else {
        store.removeFromCart(product, true);
        this.closeModal();
      }
    },
    productImage(product) {
      return product.image ? `data:image/jpeg;base64,${product.image}` : 'path/to/default/image.jpg';
    },
    placeOrder() {
      this.stockWarning = false;
      for (let item of store.cartItems) {
        if (item.quantity > item.stockQuantity) {
          this.stockWarning = true;
          return;
        }
      }
      if (!store.user) {
        localStorage.setItem('intendedRoute', '/place-order');
        this.$router.push('/login');
      } else {
        this.$router.push('/place-order');
      }
    }
  },
  setup() {
    const router = useRouter();
    return { store, router };
  }
};
</script>

<style>
.cart-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 30px;
  display: flex;
  width: 1000px;
  height: 600px;
  position: relative;
  border: 5px solid;
  border-image: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
  border-image-slice: 1;
}
.modal-image {
  width: 50%;
  height: auto;
  margin-right: 20px;
}
.modal-info {
  text-align: left;
  width: 50%;
  position: relative;
}
.controls-container {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.total-amount {
  margin-bottom: 1rem;
}
.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.quantity-controls button {
  background-color: #ccc;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  border-radius: 50%;
  font-size: 1rem;
  text-align: center;
}
.quantity-controls span {
  margin: 0 1rem;
  font-size: 1.3rem;
}
.remove-from-cart-btn {
  background: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
.animate-modal-in {
  animation: zoomIn 0.3s ease-out;
}
@keyframes zoomIn {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.cart-summary {
  margin-top: 2rem;
  text-align: center;
}
.place-order-btn {
  background: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
  border: none;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
.stock-warning {
  color: red;
}
</style>
