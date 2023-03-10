<template>
     <div v-if="message" class="text-center py-1 px-2 rounded-md text-white bg-green-600">
        {{ message }}
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        message: String
    })
</script>