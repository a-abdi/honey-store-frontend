<template>
    <div class="flex justify-center">
        <div class="flex items-center">
            <div @click="emit('delete')" class="ml-1 cursor-pointer">
                <Trash class="w-5 h-5 fill-red-600"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Trash from '../icons/Trash.vue';
    const emit = defineEmits<{
        (event: 'delete'): void
    }>()
</script>