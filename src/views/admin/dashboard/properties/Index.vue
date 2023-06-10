<template>
    <DashboardIndex>
        <template #search>
            <!-- Search -->
        </template>
        <template #create>
            <router-link to="properties/create" class="my-auto px-2 py-1 rounded-md tracking-wider text-white hover:bg-blue-400">
                Create Property
            </router-link>
        </template>
    </DashboardIndex>
</template>

<script setup lang="ts">
    import DashboardIndex from '@/components/AdminDashboardContentIndex.vue'
</script>