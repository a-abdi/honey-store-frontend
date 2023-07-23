<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-show="showDialog" class="fixed z-10 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <OnClickOutside @trigger="emit('cancel')" class="md:w-8/12 mx-auto w-full">
                    <div class="relative md:mt-2 md:rounded-md bg-white shadow-xl p-4 mx-auto w-full" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                        <div class="flex flex-row-reverse">
                            <button @click="emit('cancel')" class="text-indigo-900 focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>
                            </button>
                        </div>
                        <div class="grid sm:grid-cols-2 grid-cols-1 gap-4 my-8">
                            <div class="" v-for="(customProperty, index) in productData?.data?.customProperty.filter(property => property.type !== 'file')">
                                <div class="flex items-center bg-gray-100 pr-2 py-3">
                                    <div class="text-gray-400 text-xs">
                                        {{ customProperty.label }}:
                                    </div>
                                    <div class="text-indigo-900 text-sm px-2 tracking-wider" v-if="typeof customProperty.value == 'string'">
                                        {{ numberHelper.convertToPersian(customProperty.value) }}
                                    </div>
                                    <div class="text-gray-500 text-xs">
                                        {{ customProperty.unit }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-8 border-t border-gray-200" v-for="customProperty in productData?.data?.customProperty.filter(property => property.type == 'file')">
                            <div v-if="typeof customProperty.value == 'string'">
                                <div class="underline underline-offset-8 decoration-violet-600 decoration-2 mb-4 md:text-base text-sm text-gray-900 pr-4">
                                    {{ customProperty.label }}
                                </div>
                                <img class="sm:w-132 sm:h-144 mx-auto " :src="customProperty.value" alt="">
                            </div>
                        </div>
                    </div>
                </OnClickOutside>
            </div>
        </transition>
    </teleport>   
</template>

<script setup lang="ts">
import { NumberHelper } from '@/helper/number.helper';
import { useProductStore } from '@/stores/product';
import { OnClickOutside } from '@vueuse/components';
import { storeToRefs } from 'pinia';

const numberHelper = NumberHelper.getInstance();
defineProps<{showDialog: boolean}>();
const emit = defineEmits(['cancel']);
const productStore = useProductStore();
const { productData } = storeToRefs(productStore);
</script>