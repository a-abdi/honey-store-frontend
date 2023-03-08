<template>
    <div class="flex bg-gray-50 h-full bg-transparent text-xs md:text-sm 2xl:text-base">
        <div class="bg-white w-full h-5/6 m-0.5 sm:mx-5 mt-5 overflow-y-auto shadow-xl rounded-md">
            <div class="">
                <router-view></router-view>
            </div>
        </div>
        <AdminSidebar class="hidden sm:block"/>
    </div>
</template>

<script setup lang="ts">
    import AdminSidebar from '@/components/sidebar/AdminDashboardSidebar.vue'
</script>

