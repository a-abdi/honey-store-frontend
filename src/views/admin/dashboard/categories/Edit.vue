<template>
    <div>
        <form v-if="categoryData" @submit.prevent="">
            <div class="grid grid-cols-4 my-6">
                <div class="sm:col-span-3 col-span-full px-1 sm:p-4 my-6 mx-auto w-11/12 border border-gray-200 rounded-md">
                    <div class="w-full my-4">
                        <input v-model="newCategory.name" id="name" type="text" :placeholder="categoryData?.data?.name" class="form-input">
                    </div>
                    <div class="w-full my-4">
                        <textarea v-model="newCategory.description" :placeholder="categoryData?.data?.description" class="p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
                    </div>
                    <div class="w-full my-4 flex justify-between">
                            <div class="">
                                <input @change="onFileChange($event)" type="file" ref="imageInput" class="hidden">
                                <button @click="imageInput?.click()" class="btn-violet"> تصویر دسته </button>
                            </div>
                        <button @click="editCategory" :disabled="form.sending" :class="{'cursor-wait': form.sending}" type="submit" class="btn-violet">
                            ویرایش دسته
                        </button>
                    </div> 
                    <Message class="absolute bottom-8 right-8 bg-gray-300" 
                        :message="form.message"
                        :showMessage="form.showMessage"
                        :typeMessage="form.typeMessage"
                        @fadeMessage="form.showMessage = false" 
                    />
                </div>
                <div class="sm:col-span-1 col-span-full">
                    <div class="sm:p-4 p-0.5 sm:m-0 mt-2">
                        <img v-if="categoryImage.url" :src="categoryImage.url" alt="" class="w-auto h-auto sm:min-w-full max-w-full mx-auto">
                    </div>
                </div>
            </div>
            <table class="table-auto w-full tracking-wider">
               <thead>
                   <tr class="">
                       <th class="table-tr text-indigo-900 font-bold">برچسب</th>
                       <th class="table-tr text-indigo-900 font-bold">نوع</th>
                       <th class="table-tr text-indigo-900 font-bold">اضافه کردن</th>
                   </tr>
               </thead>
               <tbody class="text-violet-600" v-if="propertyListData?.data?.length">
                   <tr v-for="( property, index ) in propertyListData.data" :key="property._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                       <td class="table-td text-xs"> {{ property.label }} </td>
                       <td class="table-td text-xs"> {{ property.type }} </td>
                       <td class="table-td text-xs">  
                           <input v-model="categoryProperties" :id="property._id" :value="property._id" type="checkbox" class="accent-violet-600">
                       </td>
                   </tr>
               </tbody>
            </table>
        </form>
        <PageLoading v-else/>
    </div>
</template>

<script setup lang="ts">
import { getPropertyListConfig } from '@/common/config/axios/admin/property.config';
import { editCategoryListConfig } from '@/common/config/axios/admin/category.config';
import { getCategoryConfig } from '@/common/config/axios/category.config';
import { getAxiosErrorMessage } from '@/common/helpers';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { TypeMessage, type Page, type Image } from '@/common/typings/common.typings';
import type { NewCategory } from '@/common/typings/category.typings';
import { usePropertyStore } from '@/stores/property';
import PageLoading from '@/components/loading/PageLoading.vue';

const route = useRoute();
const categoryId = route.params.categoryId as string;
const form = reactive<Page>({
    sending: false,
    message: '',
    typeMessage: TypeMessage.Success,
    showMessage: false,
});
const imageInput = ref<HTMLInputElement>();
const categoryStore = useCategoryStore();
const propertyStore = usePropertyStore();
const newCategory = reactive<Partial<NewCategory>>({});
const categoryProperties = ref([]) as Ref<string[]>;
const categoryConfig = getCategoryConfig(categoryId);
const propertyConfig = getPropertyListConfig();
const { categoryData } = storeToRefs(categoryStore);
const { propertyListData } = storeToRefs(propertyStore);
const categoryImage = reactive<Image>({});
const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const id = target.id;
    if (target.files) {
        const file = target.files[0];
        categoryImage.file = file;
        categoryImage.url = URL.createObjectURL(file);
    }
};
onMounted(async () => {
    await Promise.all([
        categoryStore.getCategory(categoryConfig), 
        propertyStore.getPropertyList(propertyConfig)
    ]);
    if (categoryData.value?.data?.properties) {
        for (const property of categoryData.value?.data?.properties) {
            categoryProperties.value.push(property._id)
        }
    }
    categoryImage.url = categoryData.value?.data?.imageSrc;
    propertyListData.value?.data.sort(a => {
        if (categoryProperties.value.some(property => property == a._id)) {
            return -1;
        }
        return 0;
    });
});
const editCategory = async () => {
    try {
        const formData = new FormData();
        newCategory.description && (formData.append('description', newCategory.description));
        newCategory.name && (formData.append('name', newCategory.name));
        categoryImage.file && (formData.append('file',  categoryImage.file));
        for (let index = 0; index < categoryProperties.value.length; index++) {
            const property = categoryProperties.value[index];
            formData.append('properties', property);
        }
        const config = editCategoryListConfig(formData, categoryId);
        form.sending = true;
        await categoryStore.editCategory(config);
        form.showMessage = true;
        form.typeMessage = TypeMessage.Success;
        form.message = categoryData.value?.message;
    } catch (error: any) {
        form.showMessage = true;
        form.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            form.message = getAxiosErrorMessage(error);
        } else {
            console.log(error);
        }
    }
    form.sending = false;
}
</script>