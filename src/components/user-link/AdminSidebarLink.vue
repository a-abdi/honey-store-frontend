<template>
    <div>
        <RouterLink :to="link">
            <div :class="{'py-4': isChild, 'py-6': !isChild}" class="flex items-center justify-between border-b border-gray-200 cursor-pointer">
                <div class="flex items-center">
                    <div :class="{'text-xs': isChild, 'text-red-600': route.fullPath == link}" class="mr-2 text-sm">
                        <slot></slot>
                    </div>
                </div>
                <div>
                    <BigLeft class="w-5 h-5"/>
                </div>
            </div>
        </RouterLink>
    </div>
</template>

<script lang="ts" setup>
import BigLeft from '../icons/BigLeft.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
defineProps<{isChild: boolean, link: string}>();
</script>