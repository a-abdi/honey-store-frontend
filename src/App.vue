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
  const userData = localStorage.getItem('user')
  const cartData = localStorage.getItem('cart')
  const adminData = localStorage.getItem('admin')

  if (userData) {
    // store.commit('userAuth/setUserData', JSON.parse(userData))
  }

  if (adminData) {
    // store.commit('adminAuth/setAdminData', JSON.parse(adminData))
  }

  if (cartData) {
    // store.commit('userCart/setCartData', JSON.parse(cartData))
  }
  </script>