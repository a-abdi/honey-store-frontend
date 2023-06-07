<template>
    <div class="py-2 w-4/12 sm:w-32 xl:w-60 bg-gray-50 text-indigo-900 tracking-wide sm:tracking-wider">
        <AdminSidebarLink :is-child="false" change-color="" :link="'/admin/dashboard/products'">محصولات</AdminSidebarLink>
        <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/categories'">دسته ها</AdminSidebarLink>
        <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/properties'">خصوصیات</AdminSidebarLink>
        <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/orders?status=1'" @click="showOrdersLink = !showOrdersLink"><p class="text-indigo-900"> سفارش ها  </p></AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=1'" class="pr-4" v-if="showOrdersLink" > پرداخت شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=3'" class="pr-4" v-if="showOrdersLink"> ارسال شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=5'" class="pr-4" v-if="showOrdersLink"> تحویل شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=2'" class="pr-4" v-if="showOrdersLink"> لغو شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=4'" class="pr-4" v-if="showOrdersLink"> مرجوع شده </AdminSidebarLink>
    </div>
</template>

<script setup lang="ts">
import AdminSidebarLink from '../user-link/AdminSidebarLink.vue';
import { ref } from 'vue';
const showOrdersLink = ref(false);
</script>