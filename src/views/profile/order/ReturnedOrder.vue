<template>
    <div v-for="order in orderStore.getReturnedOrder" class="p-4 my-6 border border-gray-200 rounded-md">
        <OrderBox :order="order">مرجوع شده</OrderBox>
    </div>
    <div class="text-base md:text-lg lg:text-2xl text-indigo-900 w-full text-center pt-8" v-if="orderStore.getReturnedOrder.length == 0">
        سفارش مرجوعی وجود ندارد
    </div>
</template>

<script lang="ts" setup>
import OrderBox from '@/components/OrderBox.vue';
import { useOrderStore } from '@/stores/order';
const orderStore = useOrderStore();
</script>