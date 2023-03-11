<template>
     <form @submit.prevent="editCategory" >
        <div class="px-1 sm:p-4 my-6 mx-auto w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 border border-gray-200 rounded-md">
            <div class="w-full my-4">
                <input v-model="newCategory.name" id="name" type="text" placeholder="name" class="form-input">
            </div>
            <div class="w-full my-4">
                <textarea v-model="newCategory.description" placeholder="description" class="p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
            <div class="w-full my-4">
                <button :disabled="form.loading" :class="{'cursor-wait': form.loading}" type="submit" class="btn-blue">
                    Edit Category
                </button>
            </div> 
            <Message class="absolute bottom-8 right-8 bg-gray-300" 
                :message="form.message"
                :showMessage="form.showMessage"
                :typeMessage="form.typeMessage"
                @fadeMessage="form.showMessage = false" 
            />
        </div>
    </form>
</template>

<script setup lang="ts">
import { getCategoryConfig, editCategoryListConfig } from '@/common/config/axiox.config';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage } from '@/common/typings';
import { useCategoryStore } from '@/stores/category';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import Message from '@/components/message/Message.vue';
import type { Form, NewCategory, EditCategory } from '@/common/typings';
import axios from 'axios';

    const route = useRoute();
    const categoryId = route.params.categoryId as string;
    const form = reactive<Form>({
        loading: false,
        message: '',
        typeMessage: TypeMessage.Success,
        showMessage: false,
    });
    const categoryStore = useCategoryStore();
    const newCategory = reactive<Partial<NewCategory>>({
        name: "",
        description: "",
    });

    const { categoryData } = storeToRefs(categoryStore);
    const getCategory = async () => {
        const config = getCategoryConfig(categoryId);
        await categoryStore.getCategory(config);
        newCategory.name = categoryData.value?.data.name;
        newCategory.description = categoryData.value?.data.description;
    }

    onMounted(getCategory);

    const editCategory = async () => {
        form.loading = true

        const editCategory: EditCategory = {
            id: categoryId,
            newData: {
                name: newCategory.name,
                description: newCategory.description,
            }
        }
        try {
            const config = editCategoryListConfig(editCategory);
            form.showMessage = true;
            await categoryStore.editCategory(config);
            form.typeMessage = TypeMessage.Success;
            form.message = categoryData.value?.message;

        } catch (error: any) {
            form.typeMessage = TypeMessage.Danger;
            if (axios.isAxiosError(error)) {
               form.message = getAxiosErrorMessage(error);
            } else {
                console.log(error);
            }
        }
        form.loading = false
    }
</script>