<template>
    <div v-for="property in customProperties" class="text-sm">
        <div v-if="property && (property.type == 'file'? showFile: true)" class="flex my-8">
            <div class="ml-2">
                {{ property.label }}:
            </div>
            <div v-if="property.type == 'file' && typeof property.value == 'string'">
                <DocumenPicture @click="showAttachImage[property.label] = true" class="w-6 h-6 cursor-pointer"/>
                <ImageDialog :show-dialog="showAttachImage[property.label]" @cancel="showAttachImage[property.label] = false"> 
                    <img :src="property.value" class="object-cover w-100 h-144 mx-auto" alt=""> 
                </ImageDialog>
            </div>
            <div v-if="property.type == 'number'" class=" text-violet-600">
                {{ property.value }}
            </div>
            <div v-if="property.type == 'text'" class=" text-violet-600">
                {{ property.value }}
            </div>
            <div class="mr-1 text-violet-600">
                {{ property.unit }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { StringBoolean } from '@/common/typings/common.typings';
import type { ProductProperty } from '@/common/typings/product.typings';
import { reactive } from 'vue';
import ImageDialog from './dialog/ImageDialog.vue';
import DocumenPicture from './icons/DocumenPicture.vue';
const showAttachImage = reactive<StringBoolean>({});
const props = defineProps<{customProperties: ProductProperty[], showFile?: boolean}>();
</script>