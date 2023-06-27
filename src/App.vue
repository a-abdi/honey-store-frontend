<template>
  <AppLayout>  
    <Router-view/>
  </AppLayout>
  <ScreenLoading v-if="commonStore.pageLoading" :loading="commonStore.pageLoading"/>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { useAdminStore } from '@/stores/admin';
import { useCartStore } from '@/stores/cart';
import type { ListProductsCart } from '@/common/typings/cart.typings';
import { useUserStore } from './stores/user';
import ScreenLoading from './components/loading/ScreenLoading.vue';
import { useCommonStore } from './stores/common';

const adminStore = useAdminStore();
const cartStore = useCartStore();
const userStore = useUserStore();
const commonStore = useCommonStore();
const adminAccessToken = localStorage.getItem('adminAccessToken');
const userAccessToken = localStorage.getItem('userAccessToken');
const cart: ListProductsCart = JSON.parse(localStorage.getItem('carts')!);
if (userAccessToken) {
  userStore.userLoginData.data = { access_token: userAccessToken };
}
if (adminAccessToken) {
  adminStore.adminData.data = { access_token: adminAccessToken };
}
if (cart) {
  cartStore.listProductsCart = cart;
}
</script>