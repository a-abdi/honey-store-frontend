<template>
    <div class="py-2 w-4/12 sm:w-32 xl:w-48 border-r-2 border-gray-200 bg-gray-50 text-indigo-900 tracking-wide sm:tracking-wider">
        <AdminSidebarLink :link="'/admin/dashboard/products'">محصولات</AdminSidebarLink>
        <AdminSidebarLink :link="'/admin/dashboard/categories'">دسته ها</AdminSidebarLink>
        <AdminSidebarLink :link="'/admin/dashboard/properties'">خصوصیات</AdminSidebarLink>
        <AdminSidebarLink :link="'/admin/dashboard/orders'">سفارش ها</AdminSidebarLink>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import AdminSidebarLink from '../user-link/AdminSidebarLink.vue';
const router = useRouter()
const goTo = (link: string) => router.push(link)
</script>