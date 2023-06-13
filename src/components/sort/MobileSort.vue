<template>
    <div class="text-vsl px-8 py-1">
        <SortIcone class="text-gray-900 w-6 h-6" @click="showContent = true"/>
        <ShowMobileSort :show-dialog="showContent" @cancel="showContent = false">
            <div v-for="sort in sortList" class="text-gray-600 mx-2 w-full text-xs py-4 text-indigo-900 border-b border-gray-200">
                <div @click="sortProduct(sort.index)" class="flex items-center justify-between">
                    <div :class="{'text-violet-600': route.fullPath == `/category/${categoryId}/?sort=${sort.index}`}">
                       {{ sort.text }}
                    </div>
                    <Check v-if="route.fullPath == `/category/${categoryId}/?sort=${sort.index}`" class="w-5 h-5 text-indigo-900 ml-4"/>
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
import { ref } from 'vue';
import Check from '@/components/icons/Cehck.vue';
import router from '@/router';
const props = defineProps<{categoryId: string, sortList: SortInterface[]}>();
const route = useRoute();
const showContent = ref(false);
const sortProduct = (index: number) => {
    showContent.value = false;
    router.push(`/category/${props.categoryId}/?sort=${index}`);
};
</script>