<template>
    <form @submit.prevent="" >
        <div class="grid grid-cols-4 my-6">
            <div class="sm:col-span-3 col-span-full px-1 mx-auto w-11/12 border border-gray-200 rounded-md">
                <div class="w-full my-8">
                    <input v-model="category.name" id="name" type="text" placeholder="نام" class="placeholder-violet-400 form-input">
                </div>
                <div class="w-full my-8">
                    <textarea v-model="category.description" placeholder="توضیخات" class="placeholder-violet-400 p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
                </div>
                <div class="w-full my-8 flex justify-between">
                    <div class="">
                        <input @change="onFileChange($event)" type="file" ref="imageInput" class="hidden">
                        <button @click="imageInput?.click()" class="btn-violet"> تصویر دسته </button>
                    </div>
                    <button @click="createCategory" :disabled="form.loading" :class="{'cursor-wait': form.loading}" type="submit" class="btn-violet">
                        دسته جدید
                    </button>
                </div> 
                <Message class="absolute bottom-4 right-4 bg-gray-300" 
                    :message="form.message"
                    :showMessage="showMessage"
                    :typeMessage="form.typeMessage"
                    @fadeMessage="showMessage = false" 
                />
            </div>
            <div class="sm:col-span-1 col-span-full">
                <div class="sm:p-4 p-0.5 sm:m-0 mt-2">
                    <img v-if="productImage.url" :src="productImage.url" alt="" class="w-auto h-auto sm:min-w-full max-w-full mx-auto">
                </div>
            </div>
        </div>
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr text-indigo-900">برچسب</th>
                    <th class="table-tr text-indigo-900">نوع</th>
                    <th class="table-tr text-indigo-900">اضافه کردن</th>
                </tr>
            </thead>
            <tbody class="text-violet-600" v-if="propertyListData?.data?.length">
                <tr v-for="( property, index ) in propertyListData.data" :key="property._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td text-xs"> {{ property.label }} </td>
                    <td class="table-td text-xs"> {{ property.type }} </td>
                    <td class="table-td text-xs">  
                        <input v-model="category.properties" :id="property._id" :value="property._id" type="checkbox" class="accent-violet-600">
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>

<script setup lang="ts">
import { getPropertyListConfig } from '@/common/config/axios/admin/property.config';
import { createCategoryConfig } from '@/common/config/axios/admin/category.config';
import { reactive, ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { TypeMessage, type Page, type Image } from '@/common/typings/common.typings';
import type { NewCategory } from '@/common/typings/category.typings';
import { usePropertyStore } from '@/stores/property';
import { ErrorHander } from '@/helper/handel-error.helper';

const form = reactive<Page>({
    loading: false,
    message: '',
    typeMessage: TypeMessage.Success
});
const productImage = reactive<Image>({});
const imageInput = ref<HTMLInputElement>();
const showMessage = ref(false);
const categoryStore = useCategoryStore();
const propertyStore = usePropertyStore();
const getPropertyConfig = getPropertyListConfig();
propertyStore.getPropertyList(getPropertyConfig);
const { propertyListData } = storeToRefs(propertyStore);
const category = reactive<NewCategory>({
    name: "",
    description: "",
    properties: []
});  
const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const id = target.id;
    if (target.files) {
        const file = target.files[0];
        productImage.file = file;
        productImage.url = URL.createObjectURL(file);
    }
};
const createCategory = async () => {
    try {
        form.loading = true;
        if (!productImage.file) {
            throw new Error('تصویر دسته را وارد کنید');
        }
        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('description', category.description);
        formData.append('file', productImage.file);
        for (let index = 0; index < category.properties.length; index++) {
            const property = category.properties[index];
            formData.append('properties', property);
        }
        const config = createCategoryConfig(formData);
        await categoryStore.createCategory(config);
        showMessage.value = true;
        const { categoryData } = storeToRefs(categoryStore);
        form.typeMessage = TypeMessage.Success;
        form.message = categoryData.value?.message;
    } catch (error: any) {
        showMessage.value = true;
        form.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            const errorHander = ErrorHander.getInstance();
            form.message = errorHander.getMessage(error);
        } else {
            form.message = error.message;
            console.log(error);
        }
    }
    form.loading = false;
};
</script>