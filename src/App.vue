<template>
  <AppLayout>  
    <Router-view class="bg-white"/>
  </AppLayout> 
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { useAdminStore } from '@/stores/admin';
import { useCartStore } from '@/stores/cart';
import type { ListProductsCart } from '@/common/typings/cart.typings';

  const userData = localStorage.getItem('user');
  const adminStore = useAdminStore();
  const cartStore = useCartStore();
  const adminAccessToken = localStorage.getItem('adminAccessToken');
  const cart: ListProductsCart = JSON.parse(localStorage.getItem('carts')!);
  if (userData) {
    // store.commit('userAuth/setUserData', JSON.parse(userData))
  }

  if (adminAccessToken) {
    adminStore.adminData = { access_token: adminAccessToken };
  }

  if (cart) {
    cartStore.listProductsCart = cart;
  }
  </script>