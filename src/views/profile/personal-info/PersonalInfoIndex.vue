<template>
    <div class="w-full">
        <div class="font-bold text-lg text-gray-900 mb-2">
            اطلاعات حساب کاربری
        </div>
        <div class="w-full py-4 flex items-center border border-gray-200 rounded-md">
            <div class="w-4/12 px-4 flex justify-between items-center text-indigo-900">
                <div>
                    <div class="text-sm text-gray-600 py-1">
                        نام و نام خانوادگی
                    </div>
                    <div class="py-1 text-base font-bold">
                        {{ userData?.data?.firstName }} {{ userData?.data?.LastName }}
                    </div>
                </div>
                <div class="w-5 h-5">
                    <EditProfile class="w-5 h-5 cursor-pointer"/>
                </div>
            </div>
            <div class="w-4/12 px-4 flex items-center justify-between text-indigo-900 border-x border-gray-300">
                <div>
                    <div class="text-sm text-gray-600 py-1">
                        شماره تلفن
                    </div>
                    <div class="py-1 text-base font-bold tracking-wider">
                        {{ userData?.data?.phoneNumber.replace('+98', '0') }}
                    </div>
                </div>
                <div class="w-5 h-5">
                    <EditProfile class="w-5 h-5 cursor-pointer"/>
                </div>
            </div>
            <div class="w-4/12 px-4 flex items-center justify-between text-indigo-900">
                <div>
                    <div class="text-sm text-gray-600 py-1">
                        پسورد
                    </div>
                    <div class="py-1 text-base font-bold tracking-wider">
                        ********
                    </div>
                </div>
                <div class="w-5 h-5">
                    <EditProfile class="w-5 h-5 cursor-pointer"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Edit from '@/components/icons/Edit.vue';
import EditProfile from '@/components/icons/EditProfile.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
</script>