<template>
    <nav class="sticky top-0 right-0 left-0 bg-white border-b border-gray-150">
        <div class="mx-auto px-2 sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-14">
                <div class="flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex items-center">
                        <DashboardIcone v-if="adminStore.adminLogged" @click="showSidebar = true" class="w-6 h-6 cursor-pointer"/>
                        <div @click="showSidebar = true" class="md:text-sm text-xs px-1 cursor-pointer ">
                            داشبورد
                        </div>
                        <HomeIcone @click="$router.push('/')" class="w-6 h-6 cursor-pointer mx-4"/>
                        <AdminSidebar :show-admin-sidebar="showSidebar" @cancel="showSidebar = false"/>
                    </div>
                </div>
                <div class="">
                    <button @click="adminExit" class="flex items-center sm:border border-gray-200 rounded-md px-2 py-1">
                        <ExitIcone class="w-6 h-6 sm:ml-2 ml-0.5"/>
                        <div class="sm:text-xs text-vsl">
                            خروج
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import DashboardIcone from '@/components/icons/DashboardIcone.vue';
import ExitIcone from '@/components/icons/Exit.vue';
import HomeIcone from '@/components/icons/Home.vue';
import AdminSidebar from '@/components/sidebar/AdminSidebar.vue';
import router from '@/router';
import { useAdminStore } from '@/stores/admin';
import { ref } from 'vue';
const adminStore = useAdminStore();
const showSidebar = ref(false);
const adminExit = () => {
    adminStore.signout();
    router.push('/admin/login')
};
</script>