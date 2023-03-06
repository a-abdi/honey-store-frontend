<template>
    <div class="py-2 w-4/12 sm:w-32 xl:w-48 border-r-2 border-gray-200 bg-gray-50 text-gray-500 tracking-wide sm:tracking-wider">
        <button class="btn-link" @click="goTo('/admin/dashboard/users')">کاربران</button>
        <button class="btn-link" @click="goTo('/admin/dashboard/products')">محصولات</button>
        <button class="btn-link" @click="goTo('/admin/dashboard/categories')">دسته ها</button>
        <button class="btn-link" @click="goTo('/admin/dashboard/carts')">سبد خرید</button>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'
    const router = useRouter()
    const goTo = (link: string) => router.push(link)
</script>