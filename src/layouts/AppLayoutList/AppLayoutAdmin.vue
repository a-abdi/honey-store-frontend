<template>
    <div class="h-screen">
        <header/>
        <AdminLinks/>
        <slot/>
    </div>
</template>

<script setup lang="ts">
    import AdminLinks from '../Links/AdminLinks.vue';
</script>