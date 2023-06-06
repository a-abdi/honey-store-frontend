<template>
    <div class="text-sm">
        <div class="p-2 text-indigo-900">
            <slot></slot>
        </div>
        <div class="py-4 flex items-center text-violet-800 border-b border-gray-200">
            <div class="px-3">
                {{ (new Date(order.createdAt)).toLocaleDateString('fa-IR') }}
            </div>
            <div class="px-3 flex items-center">
                <div class="px-1 text-gray-600 text-xs">
                    شماره سفارش
                </div>
                <div>
                    {{ order._id }}
                </div>
            </div>
            <div class="px-3 flex items-center">
                <div class="px-1 text-xs text-gray-600">
                    مبلغ
                </div>
                <Currency :money="order.amount" />
                <div class="px-1 text-xs text-gray-600">
                    تومان
                </div>
            </div>
        </div>
        <div class="flex items-center py-4">
            <img v-for="cart in order.cart" :src="cart.imageSrc" alt="" class="object-cover w-10 h-12 mx-3">
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Order } from '@/common/typings/order.typings';
import Currency from './Currency.vue';
defineProps<{ order: Order }>();
</script>