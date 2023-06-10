<template>
    <div @click="emit('restore')" class="ml-1 cursor-pointer">
        <Restore class="w-5 h-5 text-green-600 mx-auto" />
    </div>
</template>

<script setup lang="ts">
import Restore from '../icons/Restore.vue';
const emit = defineEmits<{ (event: 'restore'): void }>();
</script>