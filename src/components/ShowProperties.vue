<template>
    <div>
        <div v-for="( property, index) in customProperties" class="lg:text-xs text-vsl">
            <div v-if="property && index < 3" class="md:mt-6 mt-4">
                <div class="ml-2 relative w-full flex items-center">
                    <div @mouseover="showDescription[property.label] = true" @mouseleave="showDescription[property.label] = false">
                        <p @click="showDescription[property.label] = !showDescription[property.label]" :class="{'text-indigo-500': productStore.existLabel(property.label), 'cursor-pointer': productStore.existLabel(property.label)}" class="ml-2">
                            {{ property.label }}:
                        </p>
                    </div>
                    <OnClickOutside @trigger="showDescription[property.label] = false">
                        <div v-if="showDescription[property.label] && productStore.existLabel(property.label)" class="absolute z-40 p-4 top-4 right-0 border border-gray-300 rounded-md shadow-lg bg-white h-auto overflow-auto max-h-96 2xl:w-144 lg:w-100 md:w-68 w-auto">
                            {{ productStore.propertyDescription(property.label) }}
                        </div>
                    </OnClickOutside>
                    <div v-if="property.type == 'file' && typeof property.value == 'string'">
                        <DocumenPicture @click="showAttachImage[property.label] = true" class="w-5 h-5 cursor-pointer"/>
                        <ImageDialog :show-dialog="showAttachImage[property.label]" @cancel="showAttachImage[property.label] = false"> 
                            <img :src="property.value" class="max-w-132 max-h-144 mx-auto min-w-68 mx-auto" alt=""> 
                        </ImageDialog>
                    </div>
                    <div v-if="property.type == 'number'" class=" text-indigo-900">
                        {{ property.value }}
                    </div>
                    <div v-if="property.type == 'text'" class=" text-indigo-900">
                        {{ property.value }}
                    </div>
                    <div class="mr-1 text-indigo-900">
                        {{ property.unit }}
                    </div>
                </div>
            </div>
            <div v-else-if="index == 3" class="lg:mt-8 mt-4">
                <div @click="showMoreProperty = true"  class="cursor-pointer text-violet-600">
                    ویژگی بیشتر
                </div>
                <MoreProperty :show-dialog="showMoreProperty" @cancel="showMoreProperty = false"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { StringBoolean } from '@/common/typings/common.typings';
import type { ProductProperty } from '@/common/typings/product.typings';
import { reactive, ref } from 'vue';
import ImageDialog from './dialog/ImageDialog.vue';
import DocumenPicture from './icons/DocumenPicture.vue';
import MoreProperty from '@/components/dialog/MoreProperty.vue';
import { useProductStore } from '@/stores/product';
import { OnClickOutside } from '@vueuse/components';
const showAttachImage = reactive<StringBoolean>({});
const showDescription = reactive<StringBoolean>({});
defineProps<{customProperties: ProductProperty[], showFile?: boolean}>();
const productStore = useProductStore();
const showMoreProperty = ref(false);
</script>