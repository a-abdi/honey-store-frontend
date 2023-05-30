<template>
    <div>
        <header/>
        <UserLinks/>
        <slot/>
    </div>
</template>

<script setup lang="ts">
import UserLinks from '../Links/UserLinks.vue';
</script>