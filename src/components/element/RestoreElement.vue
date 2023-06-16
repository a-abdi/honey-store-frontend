<template>
    <div @click="emit('restore')" class="ml-1 cursor-pointer">
        <Restore class="sm:w-5 sm:h-5 w-4 h-4 text-green-600 mx-auto"/>
    </div>
</template>

<script setup lang="ts">
import Restore from '../icons/Restore.vue';
const emit = defineEmits<{ (event: 'restore'): void }>();
</script>