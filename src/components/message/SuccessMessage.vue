<template>
     <div v-if="success" class="text-center py-1 px-2 rounded-md text-white bg-green-600">
        {{ success.message }}
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        success: Object
    })
</script>