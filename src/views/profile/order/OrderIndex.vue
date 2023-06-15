<template>
    <div class="w-full sm:p-4 p-2 border border-gray-200 rounded-md">
        <div class="decoration-2 text-indigo-900 mb-6 lg:text-lg md:text-base text-sm">
            سفارش های من
        </div>
        <div class="flex overflow-x-auto items-center md:text-sm text-xs text-gray-600 border-b border-gray-300 pb-4">
            <div :class="{ 'text-violet-600': route.path == '/profile/orders/current' }" class="mx-3 cursor-pointer">
                <RouterLink :to="'/profile/orders/current'" class="flex items-center">
                    <div class="sm:w-24 w-20">
                        سفارش های باز
                    </div>
                    <div :class="{ 'bg-violet-600': route.path == '/profile/orders/current', 'bg-gray-400': route.path != '/profile/orders/current' }"
                        class="py-1 px-2 mx-1 text-white md:text-xs text-vsl rounded-md" v-if="orderStore.getCurrentOrderCount">
                        {{ orderStore.getCurrentOrderCount }}
                    </div>
                </RouterLink>
            </div>
            <div :class="{ 'text-violet-600': route.path == '/profile/orders/delivered' }" class="mx-3 cursor-pointer">
                <RouterLink :to="'/profile/orders/delivered'" class="flex items-center">
                    <div class="sm:w-20 w-16">
                        تحویل شده
                    </div>
                    <div :class="{ 'bg-violet-600': route.path == '/profile/orders/delivered', 'bg-gray-400': route.path != '/profile/orders/delivered' }"
                        class="py-1 px-2 mx-1 text-white md:text-xs text-vsl rounded-md"
                        v-if="orderStore.getDeliveredOrderCount">
                        {{ orderStore.getDeliveredOrderCount }}
                    </div>
                </RouterLink>
            </div>
            <div :class="{ 'text-violet-600': route.path == '/profile/orders/canceled' }" class="mx-3 cursor-pointer">
                <RouterLink :to="'/profile/orders/canceled'" class="flex items-center">
                    <div class="sm:w-14 w-12">
                        لغو شده
                    </div>
                    <div :class="{ 'bg-violet-600': route.path == '/profile/orders/canceled', 'bg-gray-400': route.path != '/profile/orders/canceled' }"
                        class="py-1 px-2 mx-1 text-white md:text-xs text-vsl rounded-md"
                        v-if="orderStore.getCanceledOrderCount">
                        {{ orderStore.getCanceledOrderCount }}
                    </div>
                </RouterLink>
            </div>
            <div :class="{ 'text-violet-600': route.path == '/profile/orders/returned' }" class="mx-3 cursor-pointer">
                <RouterLink :to="'/profile/orders/returned'" class="flex items-center">
                    <div class="sm:w-20 w-16">
                        مرجوع شده
                    </div>
                    <div :class="{ 'bg-violet-600': route.path == '/profile/orders/returned', 'bg-gray-400': route.path != '/profile/orders/returned' }"
                        class="py-1 px-2 mx-1 text-white md:text-xs text-vsl rounded-md"
                        v-if="orderStore.getReturnedOrderCount">
                        {{ orderStore.getReturnedOrderCount }}
                    </div>
                </RouterLink>
            </div>
        </div>
        <div class="px-4 py-4 flex flex-col-reverse">
            <RouterView />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getOrdersAxiosConfig } from '@/common/config/axiox.config';
import { useOrderStore } from '@/stores/order';
import { useRoute } from 'vue-router';
const orderStore = useOrderStore();
const getOrderConfig = getOrdersAxiosConfig();
orderStore.getUserOrders(getOrderConfig);
const route = useRoute();
</script>