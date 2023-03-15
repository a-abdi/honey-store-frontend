<template>
    <div class="h-screen overflow-hidden">
        <header/>
        <AdminLinks/>
        <slot/>
    </div>
</template>

<script setup lang="ts">
    import AdminLinks from '../Links/AdminLinks.vue';
</script>