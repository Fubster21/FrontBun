<template>
  <div>
    <h1>{{ pageTitle }}</h1>
    <button class="add-new-product-btn" 
      v-if="isAdminOrSupplier" 
      @click="goToAddProduct">Add a New Product</button>
    <div class="product-list">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @click="product.stockQuantity > 0 && openModal(product)"
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
  data() {
    return {
      products: [],
      categories: [], // Add categories array here
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
      const categoryId = this.$route.query.category;
      if (categoryId) {
        return this.products.filter(product =>
          product.categories.some(category => category.id == categoryId)
        );
      }
      let searchQuery = this.$route.query.search || '';
      let prodList = this.products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
          if (a.stockQuantity == 0 && b.stockQuantity > 0) {
            // console.log("Sorting: ", a.stockQuantity, " comes after ", b.stockQuantity);
            return 1; // a should come after b
          } else if (a.stockQuantity > 0 && b.stockQuantity == 0) {
            // console.log("Sorting: ", a.stockQuantity, " comes before ", b.stockQuantity);
            return -1; // a should come before b
          } else {
            // console.log("Sorting: ", a.stockQuantity, " == ", b.stockQuantity);
            return 0; // a and b are equal in terms of stockQuantity
          }
        });
      
      // console.log("Product list: ", prodList);
      return prodList;
    },
    totalAmount() {
      return this.selectedQuantity * this.selectedProduct.price;
    },
    categoryName() {
      const categoryId = this.$route.query.category;
      if (categoryId && this.categories.length) {
        const category = this.categories.find(category => category.id == categoryId);
        return category ? category.name : 'Products';
      }
      return 'Products';
    },
    pageTitle() {
      return this.categoryName || 'Products';
    }
  },
  methods: {
    async fetchProducts() {
      let url = 'http://165.227.161.107:8080/api/v1/products/all';
      if (this.$route.query.category !== undefined && this.$route.query.category !== null) {
        const categoryId = this.$route.query.category;
        url = "http://165.227.161.107:8080/api/v1/products/category/" + categoryId;
      }
      try {
        const response = await axios.get(url);
        this.products = response.data;
        console.log('Fetched products:', this.products);
      } catch (error) {
        // console.error('Error fetching products:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://165.227.161.107:8080/api/v1/categories/all');
        this.categories = response.data;
        console.log('Fetched categories:', this.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
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
    '$route.query.search': {
      immediate: true,
      handler() {
        this.fetchProducts();
      }
    },
    '$route.query.category': {
      immediate: true,
      handler() {
        this.fetchProducts();
      }
    }
  },
  created() {
    this.fetchProducts();
    this.fetchCategories(); // Fetch categories on component creation
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
