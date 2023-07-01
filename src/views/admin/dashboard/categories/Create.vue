<template>
    <form @submit.prevent="createCategory" >
        <div class="px-1 my-6 mx-auto w-11/12 border border-gray-200 rounded-md">
            <div class="w-full my-4">
                <input v-model="category.name" id="name" type="text" placeholder="نام" class="placeholder-violet-400 form-input">
            </div>
            <div class="w-full my-4">
                <textarea v-model="category.description" placeholder="توضیخات" class="placeholder-violet-400 p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
            <div class="w-full my-4 flex flex-row-reverse">
                <button :disabled="form.loading" :class="{'cursor-wait': form.loading}" type="submit" class="btn-violet">
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
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { NewCategory } from '@/common/typings/category.typings';
import { usePropertyStore } from '@/stores/property';
        const form = reactive<Page>({
            loading: false,
            message: '',
            typeMessage: TypeMessage.Success
        });
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
        const createCategory = async () => {
            try {
                form.loading = true;
                form.errorMessage = null;
                form.successMessage = null;
                const config = createCategoryConfig(category);
                await categoryStore.createCategory(config);
                showMessage.value = true;
                const { categoryData } = storeToRefs(categoryStore);
                form.typeMessage = TypeMessage.Success;
                form.message = categoryData.value?.message;
            } catch (error: any) {
                showMessage.value = true;
                form.typeMessage = TypeMessage.Danger;
                if (axios.isAxiosError(error)) {
                form.message = getAxiosErrorMessage(error);
                } else {
                    console.log(error);
                }
            }
            form.loading = false;
        };
</script>