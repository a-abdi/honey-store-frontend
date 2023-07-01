<template>
    <div>
        <form v-if="categoryData" @submit.prevent="editCategory" >
           <div class="px-1 sm:p-4 my-6 mx-auto w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 border border-gray-200 rounded-md">
               <div class="w-full my-4">
                   <input v-model="newCategory.name" id="name" type="text" :placeholder="categoryData?.data?.name" class="form-input">
               </div>
               <div class="w-full my-4">
                   <textarea v-model="newCategory.description" :placeholder="categoryData?.data?.description" class="p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
               </div>
               <div class="w-full my-4 flex flex-row-reverse">
                   <button  :disabled="form.sending" :class="{'cursor-wait': form.sending}" type="submit" class="btn-violet">
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
           <table class="table-auto w-full tracking-wider">
               <thead>
                   <tr class="">
                       <th class="table-tr text-indigo-900 font-bold">برچسب</th>
                       <th class="table-tr text-indigo-900 font-bold">نوع</th>
                       <th class="table-tr text-indigo-900 font-bold">واحد</th>
                       <th class="table-tr text-indigo-900 font-bold">اضافه کردن</th>
                   </tr>
               </thead>
               <tbody class="text-violet-600" v-if="propertyListData?.data?.length">
                   <tr v-for="( property, index ) in propertyListData.data" :key="property._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                       <td class="table-td text-xs"> {{ property.label }} </td>
                       <td class="table-td text-xs"> {{ property.type }} </td>
                       <td class="table-td text-xs"> 
                           <div class="" v-if="property.unit?.length">
                               <div class="" v-for="unit of property.unit">
                                   {{ unit }}
                               </div>
                           </div>
                       </td>
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
import { getPropertyListConfig } from '@/common/config/axios/property.config';
import { getCategoryConfig, editCategoryListConfig } from '@/common/config/axios/category.config';
import { getAxiosErrorMessage } from '@/common/helpers';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { EditCategory, NewCategory } from '@/common/typings/category.typings';
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
    const categoryStore = useCategoryStore();
    const propertyStore = usePropertyStore();
    const newCategory = reactive<Partial<NewCategory>>({});
    const categoryProperties = ref([]) as Ref<string[]>;
    const categoryConfig = getCategoryConfig(categoryId);
    const propertyConfig = getPropertyListConfig();
    const { categoryData } = storeToRefs(categoryStore);
    const { propertyListData } = storeToRefs(propertyStore);
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
        propertyListData.value?.data.sort(a => {
            if (categoryProperties.value.some(property => property == a._id)) {
                return -1;
            }
            return 0;
        });
    });
    const editCategory = async () => {
        const editCategory: EditCategory = {
            id: categoryId,
            newData: {
                description: newCategory.description || categoryData.value?.data?.description,
                properties: categoryProperties.value
            }
        }
        if (newCategory.name) {
            editCategory.newData.name = newCategory.name;
        }
        try {
            const config = editCategoryListConfig(editCategory.newData, editCategory.id);
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