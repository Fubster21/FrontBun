<template>
  <div>
    <h1>Products</h1>
    <button class="add-new-product-btn" v-if="isAdminOrSupplier" @click="goToAddProduct">Add a New Product</button>
    <div class="product-list">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @click="openModal(product)"
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
          <div class="controls-container">
            <p><strong>Total Amount:</strong> {{ totalAmount }}$</p>
            <div class="quantity-controls">
              <button @click="decreaseQuantity">-</button>
              <span>{{ selectedQuantity }}</span>
              <button @click="increaseQuantity">+</button>
            </div>
            <button @click="addToCart" class="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';
import { store } from '../store.js';
import axios from 'axios';

export default {
  name: 'ProductPage',
  components: {
    ProductCard
  },
  // props: {
  //   selectedCategoryId: {
  //     type: [String, Number],
  //     default: null
  //   }
  // },
  props: (route) => ({ selectedCategoryId: route.query.selectedCategoryId }) ,
  data() {
    return {
      products: [],
      showModal: false,
      selectedProduct: null,
      selectedQuantity: 1
    };
  },
  computed: {
    isAdminOrSupplier() {
      return store.role === 'ADMIN' || store.role === 'SUPPLIER';
    },
    filteredProducts() {
      console.log('Filtering products by category ID:', this.selectedCategoryId);
      if (this.selectedCategoryId) {
        return this.products.filter(product =>
          product.categories.some(category => category.id == this.selectedCategoryId)
        );
      }
      return this.products;
    },
    totalAmount() {
      return this.selectedQuantity * this.selectedProduct.price;
    }
  },
  methods: {
    async fetchProducts() {
      let url = 'http://localhost:8080/api/v1/products/all';
      if (this.selectedCategoryId) {
        url = `http://localhost:8080/api/v1/products/category/${this.selectedCategoryId}`;
      }
      try {
        const response = await axios.get(url);
        this.products = response.data;
        console.log('Fetched products:', this.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    goToAddProduct() {
      this.$router.push('/add-product');
    },
    openModal(product) {
      this.selectedProduct = product;
      this.selectedQuantity = 1;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addToCart() {
      for (let i = 0; i < this.selectedQuantity; i++) {
        store.addToCart(this.selectedProduct);
      }
      this.closeModal();
    },
    increaseQuantity() {
      if (this.selectedQuantity < this.selectedProduct.stockQuantity) {
        this.selectedQuantity++;
      }
    },
    decreaseQuantity() {
      if (this.selectedQuantity > 1) {
        this.selectedQuantity--;
      }
    },
    productImage(product) {
      return product.image ? `data:image/jpeg;base64,${product.image}` : 'path/to/default/image.jpg';
    }
  },
  watch: {
    selectedCategoryId: {
      immediate: true,
      handler(newVal) {
        console.log('Category ID changed to:', newVal);
        this.fetchProducts();
      }
    }
  },
  created() {
    this.fetchProducts();
  }
};
</script>

<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.add-new-product-btn {
  background: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
  border: none;
  color: white;
  padding: 15px 40px;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 20px;
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
  border-radius: 10px;
  display: flex;
  width: 1000px;
  height: 600px;
  position: relative;
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
  margin: 0 5px;
}
.quantity-controls span {
  margin: 0 1rem;
}
.add-to-cart-btn {
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
</style>
