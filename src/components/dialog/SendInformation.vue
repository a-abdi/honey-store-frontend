<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="relative lg:mx-auto bg-white rounded-lg shadow-xl lg:w-10/12 w-full" role="dialog" ref="modal"
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
                            <div class="border-b border-gray-200 pb-1 mt-6 px-4">
                                <p class="tracking-wide text-violet-600">
                                    اطلاعات گیرنده
                                </p>
                            </div>
                            <div class="md:flex md:items-center justify-between px-6 py-5">
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        نام و نام خانوادگی
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ order.user.address?.recipient.firstName }} {{ order.user.address?.recipient.lastName }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        شماره تماس
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2 tracking-wider">
                                        {{ convertToPersian(order.user.address?.recipient.phoneNumber.replace('+98', '0')!) }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        کد پستی
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2 tracking-wider">
                                        {{ order.user.address?.postalCode }}
                                    </div>
                                </div>
                            </div>
                            <div class="px-6 py-4">
                                <div class="text-gray-500 text-xs px-1 py-1">
                                    آدرس پستی
                                </div>
                                <p class="tracking-wide leading-loose text-sm text-indigo-900">
                                    {{ order.user.address?.postalAddress }}
                                </p>
                            </div>
                            <div class="md:flex md:items-center justify-between px-6 py-5">
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        استان
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ order.user.address?.province }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        شهر
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ order.user.address?.city }}
                                    </div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-gray-500 text-xs px-1 py-2">
                                        پلاک
                                    </div>
                                    <div class="text-indigo-900 text-sm px-1 py-2">
                                        {{ order.user.address?.plaque }}
                                    </div>
                                </div>
                            </div>
                            <div class="border-b border-gray-200 pb-1 mt-6 px-4">
                                <p class="tracking-wide text-violet-600">
                                    اطلاعات سبد خرید
                                </p>
                            </div>
                            <div v-for="cart in order.cart">
                                <div class="md:flex md:items-center justify-between px-6 py-5">
                                    <div class="flex items-center">
                                        <div class="text-gray-500 text-xs px-1 py-2">
                                            نام محصول
                                        </div>
                                        <div class="text-indigo-900 text-sm px-1 py-2">
                                            <RouterLink :to="`/admin/dashboard/products/${cart.product}`">
                                                {{ cart.name }}
                                            </RouterLink>
                                        </div>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="text-gray-500 text-xs px-1 py-2">
                                            کد محصول
                                        </div>
                                        <div class="text-indigo-900 text-sm px-1 py-2 tracking-wider">
                                            {{ cart.code }}
                                        </div>
                                    </div>
                                    <div class="flex items-center">
                                        <div class="text-gray-500 text-xs px-1 py-2">
                                            تعداد سفارش
                                        </div>
                                        <div v-if="cart.quantity" class="text-indigo-900 text-sm px-1 py-2 tracking-wider">
                                            {{ convertToPersian(cart.quantity?.toString()) }}
                                        </div>
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
import { OnClickOutside } from '@vueuse/components';
import { convertToPersian } from '@/common/helpers';
const emit = defineEmits(['cancel']);
defineProps<{order: AdminOrder}>();
</script>