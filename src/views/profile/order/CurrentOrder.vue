<template>
    <div v-for="order in orderStore.getCurrentOrder" class="p-4 my-6 border border-gray-200 rounded-md">
            <div v-if="order.status == 0" class="text-sm">
                <div class="p-2 text-indigo-900">
                    در انتظار پردخت
                </div>
                <div class="py-2 flex items-center text-violet-800 border-b border-gray-200">
                    <div class="px-3">
                        {{ (new Date(order.createdAt)).toLocaleDateString('fa-IR') }}
                    </div>
                    <div class="px-3 flex items-center">
                        <div class="px-1 text-gray-600 text-xs">
                            کد سفارش
                        </div>
                        <div>
                            {{ order.code }}
                        </div>
                    </div>
                    <div class="px-3 flex items-center">
                        <div class="px-1 text-xs text-gray-600">
                            مبلغ
                        </div>
                        <Currency :money="order.amount"/>
                        <div class="px-1 text-xs text-gray-600">
                            تومان
                        </div>
                    </div>
                </div>
                <div class="flex items-center py-4">
                    <img v-for="cart in order.cart" :src="cart.imageSrc" alt="" class="object-cover w-10 h-12 mx-3">
                </div>
            </div>
            <div v-if="order.status == 1" class="">
                پردخت شده
            </div>
            <div v-if="order.status == 3" class="">
                ارسال شده
            </div>
    </div>
</template>

<script lang="ts" setup>
import Currency from '@/components/Currency.vue';
import { useOrderStore } from '@/stores/order';
import { storeToRefs } from 'pinia';
const orderStore = useOrderStore();
</script>