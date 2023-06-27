<template>
    <div>
        <div v-for="( property, index) in customProperties" class="lg:text-xs text-vsl">
            <div v-if="property && index < 3" class="md:mt-6 mt-4">
                <div class="flex items-center">
                    <div class="ml-2">
                        {{ property.label }}:
                    </div>
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
import MoreProperty from '@/components/dialog/MoreProperty.vue'
const showAttachImage = reactive<StringBoolean>({});
defineProps<{customProperties: ProductProperty[], showFile?: boolean}>();
const showMoreProperty = ref(false);
</script>