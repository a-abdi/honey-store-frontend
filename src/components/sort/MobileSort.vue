<template>
    <div class="text-vsl px-8 sm:py-1 py-2">
        <div class="flex items-center">
            <SortIcone class="text-gray-900 w-6 h-6" @click="showContent = true"/>
            <div class="text-gray-900 px-2" @click="showContent = true">
                مرتب سازی
            </div>
        </div>
        <ShowMobileSort :show-dialog="showContent" @cancel="showContent = false">
            <div v-for="sort in sortList" class="text-gray-600 mx-2 w-full text-xs py-4 text-indigo-900 border-b border-gray-200">
                <div @click="sortProduct(sort.index)" class="flex items-center justify-between">
                    <div :class="{'text-violet-600': route.fullPath == `${path}?sort=${sort.index}`}">
                       {{ sort.text }}
                    </div>
                    <Check v-if="route.fullPath == `${path}?sort=${sort.index}`" class="w-5 h-5 text-indigo-900 ml-4"/>
                </div>
            </div>
        </ShowMobileSort>
    </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import SortIcone from '../icons/Sort.vue';
import type { Sort as SortInterface } from '@/common/typings/common.typings';
import ShowMobileSort from './ShowMobileSort.vue';
import { defineAsyncComponent, ref } from 'vue';
import router from '@/router';

const Check = defineAsyncComponent(() => import('@/components/icons/Cehck.vue'));
const props = defineProps<{path: string, sortList: SortInterface[]}>();
const route = useRoute();
const showContent = ref(false);
const sortProduct = (index: number) => {
    showContent.value = false;
    router.push(`${props.path}?sort=${index}`);
};
</script>