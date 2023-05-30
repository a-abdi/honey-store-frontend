<template>
    <nav class="sticky top-0 left-0 right-0 w-full bg-gray-100">
        <div class="px-2">
            <div class="relative flex-1 flex items-center justify-between h-14">
                <div class="">
                    <div class="">
                        <div class="">
                            <router-link to="/" class="text-gray-600 hover:bg-gray-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"> خانه </router-link>
                        </div>
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
import CartLinkVue from '@/components/user-link/CartLink.vue';
import ProFileLink from '@/components/user-link/ProfileLink.vue';
</script>