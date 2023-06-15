<template>
    <div v-for="order in orderStore.getCurrentOrder" class="p-4 my-6 border border-gray-200 rounded-md">
        <OrderBox v-if="order.status == 0" :order="order">در انتظار پرداخت</OrderBox>
        <OrderBox v-if="order.status == 1" :order="order">در انتظار ارسال</OrderBox>
        <OrderBox v-if="order.status == 3" :order="order">ارسال شده</OrderBox>
    </div>
    <div class="text-base md:text-lg lg:text-2xl text-indigo-900 w-full text-center pt-8" v-if="orderStore.getCurrentOrder.length == 0">
        سفارش جاری وجود ندارد
    </div>
</template>

<script lang="ts" setup>
import OrderBox from '@/components/OrderBox.vue';
import { useOrderStore } from '@/stores/order';
const orderStore = useOrderStore();
</script>