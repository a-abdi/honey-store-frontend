<template>
    <div class="flex justify-center">
        <div class="flex items-center">
            <div @click="emit('delete')" class="cursor-pointer text-xs text-red-600 hover:text-rose-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75">
                حذف
            </div>
            <div @click="emit('delete')" class="pl-1 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>            
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const emit = defineEmits<{
        (event: 'delete'): void
    }>()
</script>