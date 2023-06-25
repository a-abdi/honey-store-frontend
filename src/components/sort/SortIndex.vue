<template>
    <div>
        <div class="text-vsl px-8 py-1 flex items-center">
            <SortIcone class="text-gray-900 w-6 h-6"/>
            <div class="text-gray-900 px-2">
                مرتب سازی:
            </div>
            <RouterLink 
                v-for="sort in sortList"
                :to="`${path}?sort=${sort.index}`" 
                :class="{'text-violet-600': route.fullPath == `${path}?sort=${sort.index}`}" 
                class="text-gray-600 mx-2"
            >
               {{ sort.text }}
            </RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SortIcone from '../icons/Sort.vue';
import type { Sort as SortInterface } from '@/common/typings/common.typings';
defineProps<{path: string, sortList: SortInterface[]}>();
const route = useRoute();
</script>