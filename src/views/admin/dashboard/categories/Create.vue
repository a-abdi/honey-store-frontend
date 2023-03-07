<template>
    <form @submit.prevent="createCategory" >
        <div class="px-1 sm:p-4 my-6 mx-auto w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 border border-gray-200 rounded-md">
            <div class="w-full my-4">
                <input v-model="category.name" id="name" type="text" placeholder="name" class="form-input">
            </div>
            <div class="w-full my-4">
                <textarea v-model="category.description" placeholder="description" class="p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
            <div class="w-full my-4">
                <button :disabled="form.loading" :class="{'cursor-wait': form.loading}" type="submit" class="btn-blue">
                    Create Category
                </button>
            </div> 
            <ErrorMessage v-if="form.error" :error="form.error" />
            <SuccessMessage v-if="form.success" :success="form.success" />
        </div>
    </form>
</template>

<script setup lang="ts">
    import { createCategoryConfig } from '@/common/config/axiox.config';
    import type { CategoryData } from '@/typings/categoryData.typings';
    import { reactive } from 'vue';
    import ErrorMessage from '@/components/message/ErrorMessage.vue';
    import SuccessMessage from '@/components/message/SuccessMessage.vue';
    import { useCategoryStore } from '@/stores/category';
    import type { Form } from '@/typings/form.typing';

        const form = reactive<Form>({
            loading: false,
            error: null,
            success: null,
        })

        const categoryStore = useCategoryStore();
        const category: CategoryData = {
            name: "",
            description: "",
        }

        const createCategory = async () => {
            form.loading = true
            form.error = null
            form.success = null

            try {
                const config = createCategoryConfig(category);
                await categoryStore.createCategory(config);
                console.log(categoryStore.category);
                
            } catch (error: any) {
                form.error = error.response.data
            }
            form.loading = false
        }

</script>