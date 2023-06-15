<template>
    <div class="lg:flex">
        <div class="lg:w-3/4 w-full px-8">
            <div v-for="productCart in listProductsCart?.products" class="flex items-center justify-between pt-4 pb-12 border-b border-gray-200">
                <div class="flex">
                    <div>
                        <img class="object-cover sm:w-20 sm:h-24 w-14 h-16" :src="productCart.product.productImagesSrc[0]" alt="">
                    </div>
                    <div class="sm:pr-6 pr-4">
                        <div class="sm:mb-10 mb-4 sm:text-sm text-xs text-indigo-900">
                            {{ productCart.product.name }}
                        </div>
                        <ProductCartQuantity class="sm:text-sm text-xs" v-if="typeof productCart.product._id == 'string'" :productId="productCart.product._id" />
                    </div>
                </div>
                <div class="">
                    <div v-if="productCart.product.discount" class="mb-2 text-red-600 flex items-center">
                        <div class="text-xs">
                            <Currency :money="productCart.product.discount" />
                        </div>
                        <div class="text-vs pr-1">
                            تومان تخفیف
                        </div>
                    </div>
                    <div class="flex items-center">
                        <div class="lg:text-lg text-sm">
                            <Currency :money="productCart.product.price - (productCart.product.discount || 0)" />
                        </div>
                        <div class="sm:text-vsl text-vs pr-2">
                            تومان
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="cartStore.productCartCount == 0" class="flex justify-center pt-24">
                <div class="">
                    <p class="md:text-3xl text-xl text-indigo-900 pb-10">
                        سبد خرید خالی است
                    </p>
                    <CartEmoji class="md:w-48 md:h-48 w-32 h-32 mx-auto"/>
                </div>
            </div>
        </div>
        <CartCheckout class="lg:ml-8" />
    </div>
</template>

<script setup lang="ts">
import Currency from '@/components/Currency.vue';
import ProductCartQuantity from '@/components/ProductCartQuantity.vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import CartCheckout from '@/components/CartCheckout.vue';
import CartEmoji from '@/components/icons/CartEmoji.vue';

const cartStore = useCartStore();
const userStore = useUserStore();
userStore.userLogged && cartStore.resetUserCart();
const { listProductsCart } = storeToRefs(cartStore);
</script>