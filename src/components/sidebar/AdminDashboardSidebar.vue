<template>
    <div class="py-2 w-4/12 sm:w-32 xl:w-60 bg-gray-50 text-indigo-900 tracking-wide sm:tracking-wider">
        <!-- product link -->
        <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/products?deletedAt=false'" @click="changeShow('product')"><p class="text-indigo-900"> محصولات </p></AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/products?deletedAt=false'" class="pr-4" v-if="showLink.product"> محصولات </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/products?deletedAt=true'" class="pr-4" v-if="showLink.product"> حذف شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/products/create'" class="pr-4" v-if="showLink.product"> ایجاد محصول </AdminSidebarLink>

        <!-- category link -->
        <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/categories'" @click="changeShow('category')"><p class="text-indigo-900"> دسته ها </p></AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/categories'" class="pr-4" v-if="showLink.category"> دسته ها</AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/categories/create'" class="pr-4" v-if="showLink.category"> ایجاد دسته </AdminSidebarLink>

        <!-- property link -->
        <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/properties'"  @click="changeShow('property')"><p class="text-indigo-900"> ویژگی ها </p></AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/properties'" class="pr-4" v-if="showLink.property"> ویژگی ها </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/properties/create'" class="pr-4" v-if="showLink.property"> ایجاد ویژگی </AdminSidebarLink>
        
        <!-- order link -->
        <AdminSidebarLink :is-child="false" :link="'/admin/dashboard/orders?status=1'" @click="changeShow('order')"><p class="text-indigo-900"> سفارش ها  </p></AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=1'" class="pr-4" v-if="showLink.order" > پرداخت شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=3'" class="pr-4" v-if="showLink.order"> ارسال شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=5'" class="pr-4" v-if="showLink.order"> تحویل شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=2'" class="pr-4" v-if="showLink.order"> لغو شده </AdminSidebarLink>
        <AdminSidebarLink :is-child="true" :link="'/admin/dashboard/orders?status=4'" class="pr-4" v-if="showLink.order"> مرجوع شده </AdminSidebarLink>
    </div>
</template>

<script setup lang="ts">
import AdminSidebarLink from '../user-link/AdminSidebarLink.vue';
import { reactive, ref } from 'vue';
const showLink = reactive({
    order: false,
    product: false,
    category: false,
    property: false,
});

const resetShowLink = () => {
    showLink.order = false;
    showLink.product = false;
    showLink.category = false;
    showLink.property = false;
};

const changeShow = (value: keyof typeof showLink) => {
    if (showLink[value]) {
        showLink[value] = false;
    } else {
        resetShowLink();
        showLink[value] = true;
    }
};
</script>