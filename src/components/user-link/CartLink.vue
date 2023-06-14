<template>
    <div v-if="(route.path != '/cart' && route.path != '/shipping' && route.path !== '/payment')" class="relative" @mouseover="showCart = true" @mouseleave="showCart = false">
        <router-link to="/cart">
            <div class="relative w-7 h-7 bg-cover bg-no-repeat" style="background-image: url(https://api.iconify.design/cil:cart.svg?color=%23878787);">
                <span v-show="cartStore.productCartCount" class="bg-violet-600 px-1 py-0.5 text-white text-xs rounded-full">
                    {{ convertToPersian(`${cartStore.productCartCount}`) }}
                </span>
            </div>
        </router-link>
        <div v-if="showCart && cartStore.productCartCount > 0" class="absolute top-7 left-0 border border-gray-300 rounded-md shadow-lg bg-white h-auto overflow-auto max-h-128 w-100">
            <div v-for="productCart in cartStore.listProductsCart?.products" class="w-full h-48 flex pb-4 border-b border-gray-200">
                <div class="w-1/3">
                    <img class="object-cover p-2 max-h-44" :src="productCart?.product?.productImagesSrc[0]" alt="">
                </div>
                <div class="w-2/3 mr-2 py-2 px-2">
                    <div class="font-bold text-indigo-900 my-3 text-medium">
                        {{ productCart.product.name }}
                    </div>
                    <ProductCartQuantity class="my-3" v-if="typeof productCart.product._id == 'string'" :productId="productCart.product._id"/>
                    <ProductCartQuantity class="my-3" v-else :productId="productCart.product._id"/>
                    <div v-if="productCart.product.discount" class="flex items-center my-3 text-red-600">
                        <div class="text-sm">
                            <Currency :money="productCart.product.discount * productCart.quantity" />
                        </div>
                        <div class="text-vs pr-1">
                            تومان تخفیف
                        </div>
                    </div>
                    <div class="flex items-center my-3">
                        <div >
                            <Currency :money="(productCart.product.price - (productCart.product.discount || 0)) * productCart.quantity" />
                        </div>
                        <div class="text-vs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
            </div>
            <div class="sticky bottom-0 bg-white">
                <div class="w-full flex justify-between bg-slate-100 h-16 py-2 px-3">
                    <div>
                        <div class="text-gray-600 text-vs">
                            مبلغ قابل پرداخت
                        </div>
                        <div class="flex items-center ">
                            <Currency class="text-violet-600" :money="cartStore.getTotalPrice" />
                            <div class="text-vs pr-1">
                                تومان
                            </div>
                        </div>
                    </div>
                    <button @click="gotToShipping" v-if="userStore.userLogged" class="btn-violet h-10">ثبت سفارش</button>
                    <button @click="gotToUserLogin" v-else="userStore.userLogged" class="btn-violet h-10"> ورود و ثبت سفارش </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { convertToPersian } from '@/common/helpers';
import router from '@/router';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Currency from '../Currency.vue';
import ProductCartQuantity from '../ProductCartQuantity.vue';
const cartStore = useCartStore();
const userStore = useUserStore();
userStore.userLogged && cartStore.resetUserCart();
const gotToShipping = () => router.push('/cart');
const gotToUserLogin = () => router.push('/login');
const route = useRoute();
const showCart = ref(false);
watch(
    () => route.path,
    path => {
        if (path == '/cart' || path == '/shipping') {
            showCart.value = false;
        }
    }
)
</script>