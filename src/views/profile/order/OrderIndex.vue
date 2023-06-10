<template>
    <div class="w-full p-4 border border-gray-200 rounded-md">
        <div class="decoration-2 text-indigo-900 mb-6 text-bold text-lg">
            سفارش های من
        </div>
        <div class="flex items-center text-gray-600 border-b border-gray-300 pb-4">
            <div :class="{ 'text-violet-600': route.path == '/profile/orders/current' }" class="mx-3 cursor-pointer">
                <RouterLink :to="'/profile/orders/current'" class="flex items-center">
                    <div>
                        سفارش های باز
                    </div>
                    <div :class="{ 'bg-violet-600': route.path == '/profile/orders/current', 'bg-gray-400': route.path != '/profile/orders/current' }"
                        class="py-1 px-2 mx-1 text-white text-xs rounded-md" v-if="orderStore.getCurrentOrderCount">
                        {{ orderStore.getCurrentOrderCount }}
                    </div>
                </RouterLink>
            </div>
            <div :class="{ 'text-violet-600': route.path == '/profile/orders/delivered' }" class="mx-3 cursor-pointer">
                <RouterLink :to="'/profile/orders/delivered'" class="flex items-center">
                    <div>
                        تحویل شده
                    </div>
                    <div :class="{ 'bg-violet-600': route.path == '/profile/orders/delivered', 'bg-gray-400': route.path != '/profile/orders/delivered' }"
                        class="py-1 px-2 mx-1 text-white text-xs rounded-md"
                        v-if="orderStore.getDeliveredOrderCount">
                        {{ orderStore.getDeliveredOrderCount }}
                    </div>
                </RouterLink>
            </div>
            <div :class="{ 'text-violet-600': route.path == '/profile/orders/canceled' }" class="mx-3 cursor-pointer">
                <RouterLink :to="'/profile/orders/canceled'" class="flex items-center">
                    <div>
                        لغو شده
                    </div>
                    <div :class="{ 'bg-violet-600': route.path == '/profile/orders/canceled', 'bg-gray-400': route.path != '/profile/orders/canceled' }"
                        class="py-1 px-2 mx-1 text-white text-xs rounded-md"
                        v-if="orderStore.getCanceledOrderCount">
                        {{ orderStore.getCanceledOrderCount }}
                    </div>
                </RouterLink>
            </div>
            <div :class="{ 'text-violet-600': route.path == '/profile/orders/returned' }" class="mx-3 cursor-pointer">
                <RouterLink :to="'/profile/orders/returned'" class="flex items-center">
                    <div>
                        مرجوع شده
                    </div>
                    <div :class="{ 'bg-violet-600': route.path == '/profile/orders/returned', 'bg-gray-400': route.path != '/profile/orders/returned' }"
                        class="py-1 px-2 mx-1 text-white text-xs rounded-md"
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