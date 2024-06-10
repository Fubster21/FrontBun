<template>
    <div class="categories-container">
        <button class="categories-btn" @click="toggleMenu">
            <i class="fas fa-bars"></i> Categories
        </button>
        <div class="categories-menu" v-if="menuVisible">
            <a href="#">Category 1</a>
            <a href="#">Category 2</a>
            <a href="#">Category 3</a>
            <a href="#">Category 4</a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menuVisible: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }
}
</script>

<style scoped>
/* .categories-container-wrapper {
  display: d-flex;
  align-items: center;
  justify-content: space-between;
} */
.categories-container {
    /* display: flex; */
  /* position: relative; */
  /* margin-top: 10px; */
  margin: 0 auto;
  /* padding: 0 15px; */
  max-width: 1200px;
}
.categories-btn {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  padding: 10px 20px;
  background-color: purple;
}
.categories-menu {
  display: none;
  position: absolute;
  top: 40px;
  left: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}
.categories-menu a {
  display: block;
  padding: 10px 20px;
  color: black;
  text-decoration: none;
}
.categories-menu a:hover {
  background-color: #f0f0f0;
}
.categories-btn:hover + .categories-menu {
  display: block;
}
</style>
