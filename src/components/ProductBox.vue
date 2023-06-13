<template>
    <div class="w-full mx-auto px-3 py-4">
        <div class="my-2 sm:mx-4">
            <img :src="product?.productImagesSrc[0]" alt="product" class="mx-auto object-cover h-60 w-56">
        </div>
        <div class="text-indigo-900 text-sm tracking-wide font-medium px-2 py-2">
            {{ product?.name }}
        </div>
        <div class="h-6 py-2 px-1 text-sm">
            <p class="truncate text-gray-600">
                {{ product?.description }}
            </p>
        </div>
        <div class="py-2">
            <TotalPrice :price="product?.price" :discount="product?.discount" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Product } from '@/common/typings/product.typings';
import TotalPrice from './TotalPrice.vue';
import Stare from './icons/Stare.vue';
defineProps<{product: Product}>();
</script>