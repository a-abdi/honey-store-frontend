<template>
    <div class="relative">
        <UserIcone @click="showProfile = !showProfile" class="md:block hidden w-6 h-6 text-gray-500 cursor-pointer"/>
        <UserIcone @click="goToProfile" class="md:hidden w-6 h-6 text-gray-500 cursor-pointer"/>
        <OnClickOutside @trigger="showProfile = false">
            <div v-if="showProfile" class="absolute px-4 top-7 left-0 border border-gray-300 rounded-md shadow-lg bg-white h-auto overflow-auto max-h-96 w-64">
                <div class="text-center text-sm py-1.5 rounded-md bg-indigo-600 font-bold text-white">
                    <div v-if="userData" class="pb-1.5">
                        {{ getFullName(userData) }}
                    </div>
                    <div v-if="userData" class="tracking-widest">
                        {{ userData.data?.phoneNumber.replace("+98", "0") }}
                    </div>
                </div>
                <div @click="goToPersonalInfo" class="flex items-center py-5 border-b border-gray-200 text-indigo-900 cursor-pointer hover:text-indigo-600">
                    <UserProfile class="w-5 h-5"/>
                    <div class="mr-2 text-sm">
                        پروفایل
                    </div>
                </div>
                <div @click="goToOrders" class="flex items-center py-5 border-b border-gray-200 text-indigo-900 cursor-pointer hover:text-indigo-600">
                    <OrderVue class="w-5 h-5"/>
                    <div class="mr-2 text-sm">
                        سفارش های من
                    </div>
                </div>
                <div @click="signout" class="flex items-center py-5 text-red-700 cursor-pointer hover:text-red-400">
                    <ExitVue class="w-5 h-5"/>
                    <div class="mr-2 text-sm">
                        خروج
                    </div>
                </div>
            </div>
        </OnClickOutside>
    </div>
</template>
<script lang="ts" setup>
import UserIcone from '@/components/icons/UserLink.vue';
import { OnClickOutside } from '@vueuse/components'
import { defineAsyncComponent, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { getUserConfig } from '@/common/config/axios/user.config';
import { getFullName } from '@/common/helpers';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useCartStore } from '@/stores/cart';
const UserProfile = defineAsyncComponent(() => import('../icons/UserProfile.vue'));
const OrderVue = defineAsyncComponent(() => import('../icons/Order.vue'));
const ExitVue = defineAsyncComponent(() => import('../icons/Exit.vue'));
const showProfile = ref(false);
const userStore = useUserStore();
const cartStore = useCartStore();
if (userStore.userLogged) {
    const userConfig = getUserConfig();
    userStore.getOneUser(userConfig);
}
const { userData } = storeToRefs(userStore);
const goToProfile = () => {
    router.push('/profile'); 
};
const goToPersonalInfo = () => {
    showProfile.value = false;
    router.push('/profile/personal-info'); 
};
const goToOrders = () => {
    showProfile.value = false;
    router.push('/profile/orders/current'); 
};
const signout = () =>{
    if (userStore.userLogged) {
        userStore.signout();
        cartStore.listProductsCart = null;
        cartStore.clearCartLocalStorage();
        router.push('/');
    }
    showProfile.value = false;
};
</script>