<template>
  <AppLayout>  
    <Router-view/>
  </AppLayout>
  <ScreenLoading v-if="commonStore.pageLoading" :loading="commonStore.pageLoading"/>
</template>

<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import type { ListProductsCart } from '@/common/typings/cart.typings';
import { useUserStore } from './stores/user';
import ScreenLoading from './components/loading/ScreenLoading.vue';
import { useCommonStore } from './stores/common';

const commonStore = useCommonStore();
const adminAccessToken = localStorage.getItem('adminAccessToken');
const userAccessToken = localStorage.getItem('userAccessToken');
const cart: ListProductsCart = JSON.parse(localStorage.getItem('carts')!);
if (userAccessToken) {
  import("@/stores/user").then((piniaStore)=> {
    const userStore = piniaStore.useUserStore();
    userStore.userLoginData.data = { access_token: userAccessToken };
  });
}
if (adminAccessToken) {
  import("@/stores/admin").then((piniaStore)=> {
    const adminStore = piniaStore.useAdminStore();
    adminStore.adminData.data = { access_token: adminAccessToken };
  });
}
if (cart) {
  import("@/stores/cart").then((piniaStore)=> {
    const cartStore = piniaStore.useCartStore();
    cartStore.listProductsCart = cart;
  });
}
</script>