<template>
    <nav class="lg:sticky z-30 top-0 left-0 right-0 w-full bg-white border-b border-gray-200">
        <div class="px-2">
            <div class="relative lg:flex-1 lg:flex items-center justify-between lg:h-16 h-32">
                <div class="pr-1 flex items-center lg:py-0 py-2.5 border-b border-gray-200 lg:border-none">
                    <div @click="showCategory = true" class="p-1 cursor-pointer flex items-center">
                        <ThreeBars class="w-6 h-6 text-gray-900 "/>
                        <p class="sm:block hidden text-xs text-gray-900 px-1">
                            دسته بندی
                        </p>
                    </div>
                    <CategorySidebar v-if="showCategory" :show-category="showCategory" @cancel="showCategory = false"/>
                    <div class="lg:mr-1 mx-auto">
                        <router-link to="/" class="text-gray-600 hover:bg-gray-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"> 
                            خانه 
                        </router-link>
                    </div>
                    <div class="mr-2 lg:w-144 hidden lg:block">
                        <UserSreach/>
                    </div>
                </div>
                <div class="flex items-center justify-between lg:py-0 py-2.5">
                    <div class="mr-2 w-full pl-3 lg:hidden">
                        <UserSreach :screen="'sm'"/>
                    </div>
                    <div class="flex items-center">
                        <div v-if="userStore.userLogged" class="ml-4">
                            <ProFileLink/>
                        </div>
                        <div v-else class="lg:border border-gray-200 rounded-md px-2 py-1 ml-6">
                            <button @click="router.push('/login')" class="flex items-center ">
                                <LoginIcone class="rotate-180 w-6 h-6 text-gray-500 ml-2"/>
                                <div class="text-xs lg:block hidden">
                                    ورود | ثبت نام
                                </div>
                                <div class="text-vs lg:hidden">
                                    ورود 
                                </div>
                            </button>
                        </div>
                        <div class="ml-4">
                            <CartLinkVue/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import ThreeBars from '@/components/icons/ThreeBars.vue';
import CartLinkVue from '@/components/user-link/CartLink.vue';
import ProFileLink from '@/components/user-link/ProfileLink.vue';
import { defineAsyncComponent, ref } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';

const UserSreach = defineAsyncComponent(
    () => import('@/components/search/UserSreach.vue')
);
const LoginIcone = defineAsyncComponent(
    () => import('@/components/icons/LoginIcone.vue')
);
const CategorySidebar = defineAsyncComponent(
    () => import('@/components/category/CateSidebar.vue')
);
const userStore = useUserStore();
const showCategory = ref(false);
</script>