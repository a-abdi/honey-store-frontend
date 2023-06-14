<template>
    <div class="lg:flex">
        <div class="lg:w-3/4 w-full px-8">
            <div v-for="productCart in listProductsCart?.products" class="flex  pt-4 pb-12 border-b border-gray-200">
                <div class="pl-4 lg:mt-12 mt-8">
                    <div>
                        <img class="object-cover lg:w-44 lg:h-48 w-32 h-36" :src="productCart.product.productImagesSrc[0]" alt="">
                    </div>
                    <div class="mt-4">
                        <ProductCartQuantity v-if="typeof productCart.product._id == 'string'" class="my-3" :productId="productCart.product._id"/>
                    </div>
                </div>
                <div class="pr-2">
                    <div class="lg:text-lg lg:mb-4 py-2 text-xs w-full text-indigo-900 underline underline-offset-8 decoration-violet-600 decoration-2">
                        {{ productCart.product.name }}
                    </div>
                    <div class="lg:mt-8">
                        <ShowProperties class="lg:h-48 h-36" v-if="productCart.product.customProperty" :custom-properties="productCart.product.customProperty"/>
                        <div v-if="productCart.product.discount" class="mb-2 text-red-600 flex items-center">
                            <div class="text-xs">
                                <Currency :money="productCart.product.discount"/>
                            </div>
                            <div class="text-vs pr-1">
                                تومان تخفیف
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div class="lg:text-lg text-sm">
                                <Currency :money="productCart.product.price - (productCart.product.discount || 0)"/>
                            </div>
                            <div class="text-vsl pr-2">
                                تومان
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CartCheckout class="lg:ml-8"/>
    </div>
</template>

<script setup lang="ts">
import Currency from '@/components/Currency.vue';
import ProductCartQuantity from '@/components/ProductCartQuantity.vue';
import ShowProperties from '@/components/ShowProperties.vue';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import CartCheckout from '@/components/CartCheckout.vue';

const cartStore = useCartStore();
const userStore = useUserStore();
userStore.userLogged && cartStore.resetUserCart();
const { listProductsCart } = storeToRefs(cartStore);
</script>