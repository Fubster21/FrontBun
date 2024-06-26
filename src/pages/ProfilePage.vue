<template>
  <div class="profile-container">
    <h1>My Profile</h1>
    <div class="profile-details" v-if="user">
      <!-- <p><strong>Username:</strong> {{ firstname }}</p> -->
      <!-- <p><strong>Email:</strong> {{ user.email }}</p> -->
      <p><strong>First Name:</strong> {{ firstname }}</p>
      <p><strong>Last Name:</strong> {{ lastname }}</p>
      <p><strong>Phone Number:</strong> {{ phone }}</p>
      <p><strong>Address:</strong> {{ address }}</p>
      <!-- <p><strong>Role:</strong> {{ user.role }}</p> -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <button @click="logout" class="logout-btn">Logout</button>
  </div>
</template>

<script>
import { store } from '../store.js';

export default {
  name: 'ProfilePage',
  computed: {
    user() {
      console.log("STORE.USER = ", store.user);
      
      return store.user;
    },
    firstname() {
      console.log("STORE.FIRSTNAME = ", store.firstName);
      return store.firstName;
    },
    lastname() {
      return store.lastName;
    },
    phone() {
      return store.phoneNumber;
    },
    address() {
      return store.address;
    }
  },
  methods: {
    logout() {
      store.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.profile-details {
  text-align: left;
  margin-bottom: 20px;
}
.logout-btn {
  background: linear-gradient(90deg, #c60000 0%, #cd8c13 100%);
  border: none;
  color: white;
  padding: 15px 40px;
  cursor: pointer;
  border-radius: 5px;
}
</style>
