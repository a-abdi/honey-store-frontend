<template>
    <div class="px-8 lg:flex">
        <div class="lg:w-3/4 w-full">
            <div v-for="productCart in listProductsCart?.products" class="flex pt-4 pb-12 border-b border-gray-200">
                <div class="pl-4">
                    <div>
                        <img class="object-cover max-w-32 max-h-48" :src="productCart.product.imageSrc" alt="">
                    </div>
                    <div class="mt-4">
                        <ProductCartQuantity v-if="typeof productCart.product._id == 'string'" class="my-3" :productId="productCart.product._id"/>
                    </div>
                </div>
                <div class="">
                    <div class="text-violet-600">
                        {{ productCart.product.name }}
                    </div>
                    <div class="mt-8">
                        <div v-if="productCart.product.discount" class="mb-4 text-red-600 flex items-center">
                            <div class="text-xs">
                                {{ convertToPersian(`${productCart.product.discount}`) }}
                            </div>
                            <div class="text-vs pr-1">
                                تومان
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="text-lg">
                                {{ convertToPersian(`${productCart.product.price - (productCart.product.discount || 0)}`) }}
                            </div>
                            <div class="text-xs pr-2">
                                تومان
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sticky bottom-0 lg:static lg:top-0 bg-white lg:w-1/4 w-full">
            <div class="border border-gray-200 rounded-md mt-4 px-2">
                <div class="flex justify-between items-center px-2 py-4 text-gray-600 text-sm">
                    <div class="text-sm">
                        قیمت کالاها ({{ convertToPersian(`${cartStore.productCartCount}`) }})
                    </div>
                    <div class="flex items-center">
                        <Currency :money="cartStore.getSumAllPrice"/>
                        <div class="text-xs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center px-2 py-4 text-gray-800">
                    <div class="text-sm">
                        جمع سبد خرید
                    </div>
                    <div class="flex items-center">
                        <Currency :money="cartStore.getTotalPrice"/>
                        <div class="text-xs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
                <div class="flex justify-between items-center px-2 py-4 text-violet-600">
                    <div class="text-sm">
                        سود شما{{ convertToPersian(`(%${cartStore.getPercentage})`) }}
                    </div>
                    <div class="flex items-center">
                        <Currency :money="cartStore.getSumAllDiscount"/>
                        <div class="text-xs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
                <div class="my-4">
                    <button @click="gotToShipping" v-if="userStore.userLogged" class="w-full btn-violet"> ثبت سفارش</button>
                    <button @click="gotToUserLogin" v-else="userStore.userLogged" class="w-full btn-violet"> ورود و ثبت سفارش </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { convertToPersian } from '@/common/helpers';
import Currency from '@/components/Currency.vue';
import ProductCartQuantity from '@/components/ProductCartQuantity.vue';
import router from '@/router';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const cartStore = useCartStore();
const userStore = useUserStore();
const { listProductsCart } = storeToRefs(cartStore);
const gotToUserLogin = () => router.push('/login');
const gotToShipping = () => router.push('/shipping');
</script>