<template>
    <div class="flex justify-center">
        <div class="flex items-center">
            <div @click="emit('delete')" class="ml-1 cursor-pointer">
                <Trash class="w-4 h-4 fill-red-600"/>
            </div>
            <div @click="emit('delete')" class="cursor-pointer text-xs text-red-600 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75">
                حذف
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