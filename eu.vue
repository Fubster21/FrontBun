<template>
  <div :class="['product-card', { 'out-of-stock': product.stockQuantity === 0 }]" @click="openModal">
    <div class="product-image-container">
      <img :src="product.stockQuantity > 0 ? productImage : grayscaleProductImage" alt="Product Image" class="product-image">
    </div>
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p v-if="product.stockQuantity > 0">{{ product.price }}$</p>
      <p v-else class="out-of-stock-text">Out of Stock</p>
      <button 
        @click.stop="addToCart" 
        class="add-button" 
        :disabled="product.stockQuantity === 0"
        :class="{ 'disabled-btn': product.stockQuantity === 0 }"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  computed: {
    productImage() {
      return this.product.image ? `data:image/jpeg;base64,${this.product.image}` : 'path/to/default/image.jpg';
    },
    grayscaleProductImage() {
      return this.product.image ? this.toGrayscale(`data:image/jpeg;base64,${this.product.image}`) : 'path/to/default/image.jpg';
    }
  },
  methods: {
    addToCart() {
      store.addToCart(this.product);
    },
    openModal() {
      this.$emit('click', this.product);
    },
    toGrayscale(base64Image) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
          }

          ctx.putImageData(imageData, 0, 0);
          resolve(canvas.toDataURL());
        };
        img.src = base64Image;
      });
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
}
.product-card.out-of-stock {
  background: #f0f0f0;
  color: #999;
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
.product-info {
  margin-top: 0.5rem;
}
.add-button {
  background: linear-gradient(270deg, #8a2be2 0%, #00c6ff 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}
.add-button.disabled-btn {
  background: #ccc;
  cursor: not-allowed;
}
.out-of-stock-text {
  color: red;
  font-weight: bold;
}
</style>
