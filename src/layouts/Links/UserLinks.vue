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
                <router-link to="/cart">
                    <div class="w-7 h-7 bg-cover bg-no-repeat" style="background-image: url(https://api.iconify.design/cil:cart.svg?color=%23878787);">
                        <span v-show="cartStore.productCartCount" class="bg-violet-600 px-1 py-0.5 text-white text-xs rounded-full">
                            {{ convertToPersian(`${cartStore.productCartCount}`) }}
                        </span>
                    </div>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { convertToPersian } from '@/common/helpers';
import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore();
</script>