<template>
    <div class="md:text-sm text-xs">
        <div class="p-2 text-indigo-900">
            <slot></slot>
        </div>
        <div class="py-4 flex flex-wrap items-center text-violet-800 border-b border-gray-200">
            <div class="px-3 sm:py-0 py-2">
                {{ (new Date(order.createdAt)).toLocaleDateString('fa-IR').replace(/\//g, '-') }}
            </div>
            <div class="px-3 flex items-center sm:py-0 py-2">
                <div class="px-1 text-gray-600 md:text-xs text-vsl">
                    شماره سفارش
                </div>
                <div>
                    {{ order._id }}
                </div>
            </div>
            <div class="px-3 flex items-center sm:py-0 py-2">
                <div class="px-1 md:text-xs text-vsl text-gray-600">
                    مبلغ
                </div>
                <Currency :money="order.amount" />
                <div class="px-1 md:text-xs text-vsl text-gray-600">
                    تومان
                </div>
            </div>
        </div>
        <div class="flex flex-wrap items-center py-4">
            <img v-for="cart in order.cart" :src="cart.imageSrc" alt="" class="object-cover w-10 h-12 mx-3">
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Order } from '@/common/typings/order.typings';
import Currency from './Currency.vue';
defineProps<{ order: Order }>();
</script>