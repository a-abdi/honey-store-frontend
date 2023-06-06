<template>
    <RouterLink :to="link">
        <div class="flex items-center justify-between py-6 border-b border-gray-200 cursor-pointer hover:text-indigo-600">
            <div class="flex items-center">
                <div class="mr-2 text-sm">
                    <slot></slot>
                </div>
            </div>
            <div>
                <BigLeft class="w-5 h-5"/>
            </div>
        </div>
    </RouterLink>
</template>

<script lang="ts" setup>
import BigLeft from '../icons/BigLeft.vue';
defineProps<{link: string}>()
</script>