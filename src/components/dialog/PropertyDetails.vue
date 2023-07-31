<template>
    <teleport to='body'>
        <transition enter-active-class="transition ease-out duration-200 transform" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-200 transform" leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="showProperty" class="fixed z-14 inset-0 overflow-y-auto bg-gray-400 bg-opacity-25">
                <div class="max-h-128">
                    <div class="relative mx-auto bg-white rounded-lg shadow-xl sm:w-10/12 sm:max-h-128 sm:min-h-0 min-h-screen w-full" role="dialog" ref="modal" aria-modal="true" aria-labelledby="modal-headline">
                        <OnClickOutside @trigger="emits('close')" class="sm:my-4 p-4">
                           <button @click="emits('close')" class="w-full flex flex-row-reverse">
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-indigo-900" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275q-.425 0-.7-.275q-.275-.275-.275-.7q0-.425.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275Z"/></svg>
                            </button>
                           <div class="sm:p-4 p-2 gap-y-12 text-indigo-900 sm:text-sm text-xs grid grid-cols-3">
                                <div class="flex items-center col-span-3 sm:col-span-1">
                                    <p class="text-gray-600 text-xs ml-2"> برچسب: </p>
                                    <p>{{ propertyData?.data?.label }}</p>
                                </div>
                                <div class="flex items-center col-span-3 sm:col-span-1">
                                    <p class="text-gray-600 text-xs ml-2"> نوع: </p>
                                    <p>{{ propertyData?.data?.type }}</p>
                                </div>
                                <div class="flex items-center col-span-3 sm:col-span-1" v-if="propertyData?.data?.createdAt">
                                    <p class="text-gray-600 text-xs ml-2"> ایجاد شده: </p>
                                    <p>{{ numberHelper.convertToPersian(getDate(propertyData?.data?.createdAt)) }}</p>
                                </div>
                                <div class="flex items-center ml-2 col-span-3" v-if="propertyData?.data?.unit.length">
                                    <p class="text-gray-600 text-xs"> واحد: </p>
                                    <p class="mx-1" v-for="unit in propertyData?.data?.unit" :key="unit">
                                        {{ unit }},
                                    </p>
                                </div>
                                <div class="ml-2 col-span-3" v-if="propertyData?.data?.description">
                                    <p class="text-gray-600 text-sm mb-2"> توضحیات: </p>
                                    <p>{{ propertyData.data.description }}</p>
                                </div>
                           </div>
                        </OnClickOutside>
                    </div>
                </div>
            </div>
        </transition>
    </teleport>   
</template>
<script setup lang="ts">
import { getPropertyAxiosConfig } from '@/common/config/axios/admin/property.config';
import { getDate } from '@/common/helpers';
import { NumberHelper } from '@/helper/number.helper';
import { usePropertyStore } from '@/stores/property';
import { OnClickOutside } from '@vueuse/components';
import { storeToRefs } from 'pinia';

const numberHelper = NumberHelper.getInstance();
const props = defineProps<{showProperty: boolean, propertyId: string}>();
const emits = defineEmits<{(event: 'close'): void}>();
const propertyStore = usePropertyStore();
const { propertyData } = storeToRefs(propertyStore);
const getPropertyConfig = getPropertyAxiosConfig(props.propertyId);
propertyStore.getProperty(getPropertyConfig);
</script>