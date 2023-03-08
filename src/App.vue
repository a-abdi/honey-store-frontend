<template>
  <AppLayout>  
    <Router-view class="bg-white"/>
  </AppLayout> 
</template>

<script lang="ts">
  export default {
    name: 'App',
  }
</script>

<script setup lang="ts">
  import AppLayout from '@/layouts/AppLayout.vue';
  import { useAdminStore } from '@/stores/admin';

  const userData = localStorage.getItem('user');
  const cartData = localStorage.getItem('cart');
  const adminStore = useAdminStore();
  const adminAccessToken = localStorage.getItem('adminAccessToken');
  if (userData) {
    // store.commit('userAuth/setUserData', JSON.parse(userData))
  }

  if (adminAccessToken) {
    adminStore.adminData = { access_token: adminAccessToken };
  }

  if (cartData) {
    // store.commit('userCart/setCartData', JSON.parse(cartData))
  }
  </script>