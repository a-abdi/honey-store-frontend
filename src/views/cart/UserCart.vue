<template>
    <div class="lg:flex">
        <div class="lg:w-3/4 w-full px-8">
            <div v-for="productCart in listProductsCart?.products" class="flex items-center justify-between pt-4 pb-12 border-b border-gray-200">
                <div class="flex">
                    <div>
                        <img class="object-cover w-20 h-24" :src="productCart.product.productImagesSrc[0]" alt="">
                    </div>
                    <div class="pr-6">
                        <div class="mb-10 text-sm text-indigo-900">
                            {{ productCart.product.name }}
                        </div>
                        <ProductCartQuantity class="text-sm" v-if="typeof productCart.product._id == 'string'" :productId="productCart.product._id" />
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
                        <div class="text-vsl pr-2">
                            تومان
                        </div>
                    </div>
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

const cartStore = useCartStore();
const userStore = useUserStore();
userStore.userLogged && cartStore.resetUserCart();
const { listProductsCart } = storeToRefs(cartStore);
</script>