<template>
    <div class="sticky bottom-0 lg:static bg-white lg:w-1/4 w-full border-t border-gray-200">
        <div class="lg:block lg:border lg:rounded-md lg:px-2 px-8 flex flex-row-reverse justify-between mt-4">
            <div class="lg:block hidden">
                <div class="flex justify-between items-center px-2 py-4 text-gray-600 text-sm">
                    <div class="text-sm">
                        قیمت کالاها ({{ convertToPersian(`${cartStore.productCartCount}`) }})
                    </div>
                    <div class="flex items-center">
                        <Currency :money="cartStore.getSumAllPrice" />
                        <div class="text-xs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
            </div>
            <div class="lg:flex text-xs justify-between items-center px-2 py-4">
                <div class="lg:text-gray-800 lg:text-base text-vsl text-gray-600 text-sm">
                    جمع سبد خرید
                </div>
                <div class="lg:text-gray-800 text-indigo-900 flex items-center">
                    <Currency :money="cartStore.getTotalPrice" />
                    <div class="text-xs pr-1 text-vsl">
                        تومان
                    </div>
                </div>
            </div>
            <div class="hidden lg:block">
                <div class="flex justify-between items-center px-2 py-4 text-violet-600">
                    <div class="text-sm">
                        سود شما{{ convertToPersian(`(%${cartStore.getPercentage})`) }}
                    </div>
                    <div class="flex items-center">
                        <Currency :money="cartStore.getSumAllDiscount" />
                        <div class="text-xs pr-1">
                            تومان
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-4">
                <button @click="gotToShipping" v-if="userStore.userLogged && cartStore.productCartCount > 0" class="w-full btn-violet"> 
                    ثبت سفارش
                </button>
                <button v-if="userStore.userLogged && cartStore.productCartCount == 0" class="w-full btn-violet-desible"> 
                    ثبت سفارش
                </button>
                <button @click="gotToUserLogin" v-if="!userStore.userLogged" class="w-full btn-violet">
                     ورود و ثبت سفارش
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { convertToPersian } from '@/common/helpers';
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import Currency from './Currency.vue';

const cartStore = useCartStore();
const userStore = useUserStore();
const gotToUserLogin = () => router.push('/login');
const gotToShipping = () => router.push('/payment');
</script>