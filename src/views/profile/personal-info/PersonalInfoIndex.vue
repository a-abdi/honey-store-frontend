<template>
    <div class="w-full">
        <div class="pr-3 font-bold text-lg text-gray-900 mb-2">
            اطلاعات حساب کاربری
        </div>
        <div class="w-full md:py-4 md:flex items-center border border-gray-200 rounded-md">
            <div class="md:w-4/12 py-5 md:py-0 px-4 flex justify-between items-center text-indigo-900 md:border-l border-gray-300">
                <div>
                    <div class="text-sm text-gray-600 py-1">
                        نام و نام خانوادگی
                    </div>
                    <div class="py-1 text-base font-bold">
                        {{ userData?.data?.firstName }} {{ userData?.data?.LastName }}
                    </div>
                </div>
                <div class="">
                    <EditProfile class="w-5 h-5 cursor-pointer"/>
                </div>
            </div>
            <div class="md:w-4/12 py-5 md:py-0 px-4 flex items-center justify-between text-indigo-900 md:border-none border-y border-gray-300">
                <div>
                    <div class="text-sm text-gray-600 py-1">
                        شماره تلفن
                    </div>
                    <div class="py-1 text-base font-bold tracking-wider">
                        {{ userData?.data?.phoneNumber.replace('+98', '0') }}
                    </div>
                </div>
                <div class="">
                    <EditProfile class="w-5 h-5 cursor-pointer"/>
                </div>
            </div>
            <div class="md:w-4/12 py-5 md:py-0 px-4 flex items-center justify-between text-indigo-900  md:border-r border-gray-300">
                <div>
                    <div class="text-sm text-gray-600 py-1">
                        پسورد
                    </div>
                    <div class="py-1 text-base font-bold tracking-wider">
                        ********
                    </div>
                </div>
                <div class="">
                    <EditProfile @click="showChangePassword = true" class="w-5 h-5 cursor-pointer"/>
                    <ChangePassword :show-dialog="showChangePassword" @cancel="showChangePassword = false"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ChangePassword from '@/components/dialog/ChangePassword.vue';
import EditProfile from '@/components/icons/EditProfile.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { provide, ref } from 'vue';
const showChangePassword = ref(false);
provide('showDialog', showChangePassword);
const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
</script>