<template>
    <div class="max-w-xs px-3 py-4">
        <div class="m-2">
            <img :src="product?.imageSrc" alt="product" class="object-cover h-64 w-full">
        </div>

        <div class="tracking-wide font-medium px-2 py-2">
            {{ product?.name }}
        </div>

        <div class="h-6 py-2 px-1">
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
import TotalPrice from './TotalPrice.vue'

    const props = defineProps({
        product: Object
    });
</script>