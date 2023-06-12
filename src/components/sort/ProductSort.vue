<template>
    <div class="text-vsl px-8 py-1 flex items-center">
        <Sort class="text-gray-900 w-6 h-6"/>
        <div class="text-gray-900 px-2">
            مرتب سازی:
        </div>
        <RouterLink :to="`/category/${categoryId}/?sort=${1}`" :class="{'text-violet-600': route.fullPath == `/category/${categoryId}/?sort=${1}`}" class="text-gray-600 mx-2 font-bold">
            جدید ترین
        </RouterLink>
        <RouterLink :to="`/category/${categoryId}/?sort=${7}`" :class="{'text-violet-600': route.fullPath == `/category/${categoryId}/?sort=${7}`}" class="text-gray-600 mx-2">
            پرفروش ترین
        </RouterLink>
        <RouterLink :to="`/category/${categoryId}/?sort=${3}`" :class="{'text-violet-600': route.fullPath == `/category/${categoryId}/?sort=${3}`}" class="text-gray-600 mx-2">
            گران ترین
        </RouterLink>
        <RouterLink :to="`/category/${categoryId}/?sort=${2}`" :class="{'text-violet-600': route.fullPath == `/category/${categoryId}/?sort=${2}`}" class="text-gray-600 mx-2">
            ارزان ترین
        </RouterLink>
        <RouterLink :to="`/category/${categoryId}/?sort=${5}`" :class="{'text-violet-600': route.fullPath == `/category/${categoryId}/?sort=${5}`}" class="text-gray-600 mx-2">
            پرتخفیف ترین
        </RouterLink>
        <RouterLink :to="`/category/${categoryId}/?sort=${4}`" :class="{'text-violet-600': route.fullPath == `/category/${categoryId}/?sort=${4}`}" class="text-gray-600 mx-2">
            محبوب ترین
        </RouterLink>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Sort from '../icons/Sort.vue';
defineProps<{categoryId: string}>();
const route = useRoute();
</script>