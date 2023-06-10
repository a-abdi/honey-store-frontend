<template>
    <nav class="sticky top-0 right-0 left-0 bg-white border-b border-gray-150">
        <div class="mx-auto px-2 sm:px-6 lg:px-8">
            <!-- Mobile menu, show/hide based on menu state. -->
            <div v-show="mainMenu" class="sm:hidden" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <router-link to="/admin/dashboard" class="bg-gray-50 text-gray-900 block px-3 py-2 rounded-md text-base font-medium" aria-current="page">داشبورد</router-link>
                </div>
            </div>
            <div class="relative flex items-center justify-between h-14">
                <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex space-x-4">
                            <router-link to="/admin/dashboard" class="bg-gray-50 text-gray-900 px-3 py-2 rounded-md text-sm font-medium" aria-current="page">داشبورد</router-link>
                            <router-link to="/" class="text-gray-600 hover:bg-gray-50 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"> خانه </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    const userMenu = ref(false);
    const mainMenu = ref(false);
    const closeUserMenu = () => userMenu.value = false;
</script>