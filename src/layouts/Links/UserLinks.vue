<template>
    <nav class="sticky top-0 left-0 right-0 w-full bg-gray-100">
        <div class="px-2">
            <div class="relative flex-1 flex items-center justify-between h-14">
                <div class="">
                    <div class="">
                        <div class="">
                            <router-link to="/" class="text-gray-600 hover:bg-gray-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"> خانه </router-link>
                        </div>
                    </div>
                </div>
                <div class="relative" @mouseover="showCart = true" @mouseleave="showCart = false">
                    <router-link to="/cart">
                        <div class="relative w-7 h-7 bg-cover bg-no-repeat" style="background-image: url(https://api.iconify.design/cil:cart.svg?color=%23878787);">
                            <span v-show="cartStore.productCartCount" class="bg-violet-600 px-1 py-0.5 text-white text-xs rounded-full">
                                {{ convertToPersian(`${cartStore.productCartCount}`) }}
                            </span>
                        </div>
                    </router-link>
                    <div v-if="showCart && cartStore.productCartCount > 0 && route.path != '/cart'" class="absolute top-7 left-0 border border-gray-300 rounded-md shadow-lg bg-white h-auto overflow-auto max-h-128 w-100">
                        <div v-for="product in cartStore.listProductsCart?.products" class="w-full h-48 flex pb-4 border-b border-gray-200">
                            <div class="w-1/3">
                                <img class="object-cover p-2 max-h-44" :src="product.imageSrc" alt="">
                            </div>
                            <div class="w-2/3 mr-2 py-2 px-2">
                                <div class="font-bold text-indigo-900 my-3 text-medium">
                                    {{ product.name }}
                                </div>
                                <ProductCartQuantity class="my-3" v-if="typeof product._id == 'string'" :productId="product._id"/>
                                <ProductCartQuantity class="my-3" v-else :productId="product._id._id"/>
                                <div v-if="product.discount" class="flex items-center my-3 text-red-600">
                                    <div class="text-sm">
                                        <Currency :money="product.discount * product.quantity" />
                                    </div>
                                    <div class="text-vs pr-1">
                                        تومان تخفیف
                                    </div>
                                </div>
                                <div class="flex items-center my-3">
                                    <div >
                                        <Currency :money="(product.price - (product.discount || 0)) * product.quantity" />
                                    </div>
                                    <div class="text-vs pr-1">
                                        تومان
                                    </div>
                                </div>
                            </div>
                        </div>
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
                            <button class="btn-violet h-10">
                                ثبت سفارش
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { convertToPersian } from '@/common/helpers';
import { useRoute } from 'vue-router';
import Currency from '@/components/Currency.vue';
import ProductCartQuantity from '@/components/ProductCartQuantity.vue';
import { useCartStore } from '@/stores/cart';
import { ref } from 'vue';
const cartStore = useCartStore();
const showCart = ref(false);
const route = useRoute();
</script>