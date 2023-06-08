<template>
    <nav class="sticky top-0 left-0 right-0 w-full bg-white border-b border-gray-200">
        <div class="px-2">
            <div class="relative flex-1 flex items-center justify-between h-16">
                <div class="pr-4 flex items-center">
                    <div @click="showCategory = true" class="p-1 cursor-pointer flex items-center">
                        <ThreeBars class="w-6 h-6 text-gray-900 "/>
                        <p class="text-xs text-gray-900 font-bold px-1">
                            دسته بندی
                        </p>
                    </div>
                    <CategorySidebar :show-category="showCategory" @cancel="showCategory = false"/>
                    <div class="mr-1">
                        <router-link to="/" class="text-gray-600 hover:bg-gray-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"> 
                            خانه 
                        </router-link>
                    </div>
                </div>
                <div class="flex items-center">
                    <!-- profile -->
                    <div class="ml-6">
                        <ProFileLink/>
                    </div>
                    <div class="ml-4">
                        <CartLinkVue/>
                    </div>
                    <!-- cart -->
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import ThreeBars from '@/components/icons/ThreeBars.vue';
import CartLinkVue from '@/components/user-link/CartLink.vue';
import ProFileLink from '@/components/user-link/ProfileLink.vue';
import CategorySidebar from '@/components/category/CateSidebar.vue';
import { ref } from 'vue';
const showCategory = ref(false);
</script>