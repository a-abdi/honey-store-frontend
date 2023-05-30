<template>
    <div class="px-6 w-4/12 text-indigo-900 tracking-wide sm:tracking-wider font-bold">
        <div class="text-center text-sm py-1.5 rounded-md bg-indigo-600 text-white">
            <div v-if="userData" class="pb-1.5">
                {{ getFullName(userData) }}
            </div>
            <div v-if="userData" class="tracking-widest">
                {{ userData.data?.phoneNumber.replace("+98", "0") }}
            </div>
        </div>
        <div class="flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer hover:text-indigo-600">
            <div class="flex items-center">
                <UserProfile class="w-5 h-5"/>
                <div class="mr-2 text-sm">
                    اطلاعات کاربری
                </div>
            </div>
            <div>
                <BigLeft class="w-5 h-5"/>
            </div>
        </div>
        <div class="flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer hover:text-indigo-600">
            <div class="flex items-center">
                <Location class="w-5 h-5"/>
                <div class="mr-2 text-sm">
                    آدرس
                </div>
            </div>
            <div>
                <BigLeft class="w-5 h-5"/>
            </div>
        </div>
        <div class="flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer hover:text-indigo-600">
            <div class="flex items-center">
                <Order class="w-5 h-5"/>
                <div class="mr-2 text-sm">
                    سفارش های من
                </div>
            </div>
            <div>
                <BigLeft class="w-5 h-5"/>
            </div>
        </div>
        <div class="flex items-center py-6 border-b border-gray-200 text-red-700 cursor-pointer hover:text-red-400">
            <Exit class="w-5 h-5"/>
            <div class="mr-2 text-sm">
                خروج از حساب
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getFullName } from '@/common/helpers';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import Location from '../icons/Location.vue';
import Order from '../icons/Order.vue';
import Exit from '../icons/Exit.vue';
import UserProfile from '../icons/UserProfile.vue';
import BigLeft from '../icons/BigLeft.vue';
const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
const router = useRouter();
const goTo = (link: string) => router.push(link);
</script>