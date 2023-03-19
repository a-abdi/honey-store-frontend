<template>
    <div class="flex justify-between border border-gray-200 rounded-md shadow-lg p-2">
        <div class="mx-1">
            <Plus @click="updateQuantity(1)" class="w-6 h-6 fill-violet-600 cursor-pointer"/>
        </div>
        <div class="mx-4 text-violet-600">
            {{ convertToPersian(`${cartStore.getCartByProductId(productId!)?.quantity}`) }}
        </div>
        <div v-if="cartStore.getQuantityProduct(productId!) > 1" @click="updateQuantity(-1)" class="mx-1">
            <Minus class="w-6 h-6 fill-violet-600 cursor-pointer"/>
        </div>
        <div v-if="cartStore.getQuantityProduct(productId!) === 1" @click="delteProductInCart">
            <Trash class="w-6 h-6 fill-violet-600 cursor-pointer" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { convertToPersian } from '@/common/helpers';
import { useCartStore } from '@/stores/cart';
import Plus from '@/components/icons/Plus.vue';
import Minus from '@/components/icons/Minus.vue';
import Trash from '@/components/icons/Trash.vue';
    const prop = defineProps({
        productId: String
    });

    const cartStore = useCartStore();
    const updateQuantity = (value: number) => {
        const objIndex = cartStore.listProductsCart?.products.findIndex((product => product._id == prop.productId)) as number;
        if (cartStore.listProductsCart?.products[objIndex].quantity) {
            cartStore.listProductsCart.products[objIndex].quantity += value;
            cartStore.setCartLocalStorage();
        }
    };

    const delteProductInCart = () => {
        const objIndex = cartStore.listProductsCart?.products.findIndex((product => product._id == prop.productId)) as number;
        if (cartStore.listProductsCart?.products[objIndex].quantity) {
            cartStore.listProductsCart.products.splice(objIndex, 1);
            cartStore.setCartLocalStorage();
        }
    }
</script>