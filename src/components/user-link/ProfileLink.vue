<template>
    <div class="relative">
        <UserIcone @click="showProfile = true" class="w-6 h-6 text-gray-500 cursor-pointer"/>
        <OnClickOutside @trigger="showProfile = false">
            <div v-if="showProfile && route.path != '/profile'" class="absolute px-4 top-7 left-0 border border-gray-300 rounded-md shadow-lg bg-white h-auto overflow-auto max-h-96 w-64">
                <div class="text-center text-sm py-1.5 rounded-md bg-indigo-600 font-bold text-white">
                    <div v-if="userData" class="pb-1.5">
                        {{ getFullName(userData) }}
                    </div>
                    <div v-if="userData" class="tracking-widest">
                        {{ userData.data?.phoneNumber.replace("+98", "0") }}
                    </div>
                </div>
                <div @click="goToProfile" class="flex items-center py-5 border-b border-gray-200 text-indigo-900 cursor-pointer hover:text-indigo-600">
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
                <div class="flex items-center py-5 text-red-700 cursor-pointer hover:text-red-400">
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
import { ref } from 'vue';
import UserProfile from '../icons/UserProfile.vue';
import OrderVue from '../icons/Order.vue';
import ExitVue from '../icons/Exit.vue';
import { useUserStore } from '@/stores/user';
import { getUserConfig } from '@/common/config/axiox.config';
import { getFullName } from '@/common/helpers';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useRoute } from 'vue-router';
const showProfile = ref(false);
const route = useRoute();
const userStore = useUserStore();
if (userStore.userLogged) {
    const userConfig = getUserConfig();
    userStore.getOneUser(userConfig);
}
const { userData } = storeToRefs(userStore);
const goToProfile = () => {
    showProfile.value = false;
    router.push('/profile'); 
};
const goToOrders = () => {
    showProfile.value = false;
    router.push('/profile/orders/current'); 
};
</script>