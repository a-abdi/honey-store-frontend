<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="relative lg:mx-auto bg-white rounded-lg shadow-xl lg:w-10/12 w-full min-w-lg" role="dialog" ref="modal"
                    aria-modal="true" aria-labelledby="modal-headline">
                    <OnClickOutside @trigger="emit('cancel')" class="sm:my-4 p-4">
                        <button @click="emit('cancel')"
                            class="absolute top-4 left-4 text-indigo-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                    d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z" />
                            </svg>
                        </button>
                        <div class="mt-10 pt-6 mb-6 border-t border-gray-300">
                            <div class="border-b border-gray-200 pb-1 px-4">
                                <p class="tracking-wide text-violet-600">
                                    اطلاعات کاربر
                                </p>
                            </div>
                            <div class="md:flex md:items-center justify-between px-6 py-5">
                                <div class="flex items-center ">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        نام و نام خانوادگی
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ order?.user?.firstName }} {{ order.user.lastName }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        شماره تماس
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2 tracking-wider">
                                        {{ convertToPersian(order.user.phoneNumber.replace('+98', '0')) }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        تاریخ عضویت
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ new Date(order.user.createdAt).toLocaleDateString('fa-IR').replace(/\//g, '-') }}
                                    </div>
                                </div>
                            </div>
                            <div class="border-b border-gray-200 mt-6 pb-1 px-4">
                                <p class="tracking-wide text-violet-600">
                                    اطلاعات سفارش
                                </p>
                            </div>
                            <div class="md:flex md:items-center justify-between px-6 py-5">
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        شناسه سفارش
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ order.orderId}}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        وضعیت سفارش
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{  orderStore.getStatus(order.status) }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        تاریخ سفارش
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ new Date(order.createdAt).toLocaleDateString('fa-IR').replace(/\//g, '-') }}
                                    </div>
                                </div>
                            </div>
                            <div class="md:flex md:items-center justify-between px-6 py-5">
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        مبلغ سفارش
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        <Currency :money="order.amount"/>
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        شناسه تراکنش
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{  order.transaction?.id }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        کد رهگیری
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ order.transaction?.trackId }}
                                    </div>
                                </div>
                            </div>
                            <div class="md:flex md:items-center justify-between px-6 py-5">
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        شماره کارت
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ order.transaction?.cardNo}}
                                    </div>
                                </div>
                                <div v-if="order.transaction?.status" class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        وضعیت تراکنش
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{  orderStore.getTransactionStatus(order.transaction?.status) }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        مبلغ پرداختی
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        <Currency :money="order.transaction?.paymentAmount" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OnClickOutside>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<script setup lang="ts">
import type { AdminOrder } from '@/common/typings/order.typings';
import { useOrderStore } from '@/stores/order';
import { OnClickOutside } from '@vueuse/components';
import Currency from '../Currency.vue';
import { convertToPersian } from '@/common/helpers';
const emit = defineEmits(['cancel']);
defineProps<{order: AdminOrder}>();
const orderStore = useOrderStore();
</script>