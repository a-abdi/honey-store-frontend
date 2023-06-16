<template>
    <div v-if="userStore.userLogged">
        <div class="md:flex bg-gray-50 h-full bg-transparent text-xs md:text-sm 2xl:text-base">
            <UserProfileSidebar :class="{'hidden': route.name != 'Profile'}" class="md:hidden md:w-4/12 w-full"/>
            <UserProfileSidebar class="md:block hidden md:w-4/12 w-full"/>
            <div :class="{'hidden': route.name == 'Profile'}" class="bg-white w-full h-5/6 mt-5 overflow-y-auto shadow-xl rounded-md">
                <div class="md:hidden flex items-center text-gray-900">
                    <ArrowRight @click="goToProfile" class="w-5 h-5 mx-4"/>
                    <div @click="goToProfile" class="underline underline-offset-8 decoration-violet-600 tracking-wider decoration-2 text-base">
                        پروفایل
                    </div>
                </div>
                <div class="mt-8">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowRight from '@/components/icons/ArrowRight.vue';
import UserProfileSidebar from '@/components/sidebar/UserProfileSidebar.vue';
import router from '@/router';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
const route = useRoute();
const goToProfile = () => router.push('/profile');
const userStore = useUserStore();
</script>