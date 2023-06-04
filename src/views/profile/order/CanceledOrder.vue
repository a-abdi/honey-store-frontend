<template>
    <div v-for="order in orderStore.getCanceledOrder" class="p-4 my-6 border border-gray-200 rounded-md">
        <OrderBox :order="order">لغو شده</OrderBox>
    </div>
</template>

<script lang="ts" setup>
import OrderBox from '@/components/OrderBox.vue';
import { useOrderStore } from '@/stores/order';
const orderStore = useOrderStore();
</script>