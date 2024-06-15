<!-- <template>
    <div>
      <div class="product-list">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" @add-to-cart="addToCart" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ProductCard from './ProductCard.vue';
  
  export default {
    name: 'ProductList',
    components: {
      ProductCard
    },
    data() {
      return {
        products: [],
        cart: JSON.parse(localStorage.getItem('cart')) || []
      };
    },
    computed: {
      filteredProducts() {
        const searchQuery = this.$route.query.search ? this.$route.query.search.toLowerCase() : '';
        return this.products.filter(product =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery)
        );
      }
    },
    mounted() {
      axios.get('/products.json')
        .then(response => {
          this.products = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the products!", error);
        });
    },
    methods: {
      addToCart(product) {
        this.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    }
  }
  </script>
  
  <style scoped>
  .product-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  </style>
   -->