<template>
    <teleport to='body'>
        <transition enter-active-class="transition opacity-0 scale-300 delay-100 ease-in duration-300 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="showCategory" class="fixed z-10 inset-0 overflow-y-auto bg-gray-300 bg-opacity-25">
                <div class="relative h-screen bg-white lg:w-64 md:w-4/12 sm:w-5/12 w-8/12" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                    <OnClickOutside @trigger="emit('cancel')" class="p-4">
                        <button @click="emit('cancel')" class="absolute top-4 left-4 text-indigo-600 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-900" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>
                        </button>
                        <div class="mt-10 pt-2 mb-6 text-indigo-900">
                            <RouterLink :to="'/'">
                                <div class="pb-4 font-blod  w-full text-center">
                                    خانه
                                </div>
                            </RouterLink>
                            <div v-for="category in categoryListData?.data" :key="category._id">
                                <div @click="getProduct(category._id)" class="flex items-center justify-between px-4 py-4 my-1 cursor-pointer">
                                    <div class="text-sm">
                                        {{ category.name }}
                                    </div>
                                    <div>
                                        <BigLeft class="h-5 w-5"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </OnClickOutside>
                </div>
            </div>
        </transition>
    </teleport>   
</template>
<script setup lang="ts">
import { getCategoryListConfig } from '@/common/config/axiox.config';
import { useCategoryStore } from '@/stores/category';
import { OnClickOutside } from '@vueuse/components';
import { storeToRefs } from 'pinia';
import BigLeft from '../icons/BigLeft.vue';
import router from '@/router';
const emit = defineEmits<{(event: 'cancel'): void}>();
defineProps<{showCategory: boolean}>();
const categoryStore = useCategoryStore();
const { categoryListData } = storeToRefs(categoryStore);
const categoryConfig = getCategoryListConfig();
categoryStore.getCategoryList(categoryConfig);
const getProduct = (categoryId: string) => {
    emit('cancel');
    router.push({
        path: `/category/${categoryId}`
    });
};
</script>