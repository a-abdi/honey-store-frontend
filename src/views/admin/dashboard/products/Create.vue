<template>
    <form @submit.prevent="addProduct">
        <div class="sm:flex w-full">
            <div class="w-full sm:w-2/3 border border-gray-200 rounded-md p-2 sm:m-4">
                <div class="md:flex md:justify-between my-2 md:my-6">
                    <input v-model="newProduct.name" id="name" type="text" placeholder="نام" class=" md:w-5/12 my-2 md:my-0 form-input text-right">
                    <input v-model="newProduct.quantity" id="quantity" type="number" min="1" placeholder="تعداد" class=" md:w-5/12 my-2 md:my-0 form-input text-right">
                </div>
                <div class="md:flex md:justify-between md:items-center my-2">
                    <input v-model="newProduct.price"    id="price"    type="number" min="1" placeholder="قیمت"  class="w-full md:w-4/12 my-2 md:my-0 form-input text-right">
                    <div class="block w-full md:w-4/12 my-2 md:my-0 text-center">
                        <label for="productImage" class="btn-violet cursor-pointer p-2 border border-gray-200"> تصویر محصول</label>
                        <input id="productImage" hidden @change="onProductImageChange" type="file"/>
                    </div>
                    <input v-model="newProduct.discount" id="discount" type="number" min="0" placeholder="تخفیف" class="w-full md:w-4/12 my-2 md:my-0 form-input text-right">
                </div>
                <div class="md:flex md:items-center md:justify-between my-2 md:my-6">
                    <select v-model="newProduct.category" v-if="categoryListData?.data" name="category" autofocus="true" id="category" aria-placeholder="select category" class="w-full md:w-4/12 my-2 md:my-0 appearance-none bg-white text-gray-600 form-input text-right">
                        <option value="" disabled selected>دسته</option>
                        <option v-for="category in categoryListData.data" :key="category._id" :value="category._id">{{ category.name }}</option>
                    </select>
                    
                    <div class="block w-full md:w-4/12 my-2 md:my-0 text-center">
                        <label for="addintionalFile" class="btn-violet cursor-pointer p-2 border border-gray-200">تصویر بیشتر</label>
                        <input hidden id="addintionalFile" @change="onAddintionalFileChange" type="file" multiple="true" />
                    </div>
                    <button :disabled="page.loading" :class="{'cursor-wait': page.loading}" type="submit" class="w-full md:w-4/12 my-2 md:my-0 btn-blue">
                        اضافه کردن محصول 
                    </button>
                </div> 
                <div class="mt-6 mb-3 w-full">
                    <textarea v-model="newProduct.description" placeholder="توضیحات" class="p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200 text-right"></textarea>
                </div>
                <div class="flex items-center mt-6 mb-3 w-full">
                    
                    <div v-for="additionalImageUrl of additionalsImageUrl" class="px-2">
                        <img :src="additionalImageUrl" alt="" class="object-cover w-auto h-auto min-w-full max-w-12 max-h-16 mx-auto">
                    </div>
                </div>
                <Message class="absolute bottom-8 right-8 bg-gray-300" 
                    :message="page.message"
                    :showMessage="page.showMessage"
                    :typeMessage="page.typeMessage"
                    @fadeMessage="page.showMessage = false" 
                />
            </div>
            <div class="sm:w-1/3 w-full">
                <div class="sm:p-4 p-0.5 sm:m-0 mt-2">
                    <img :src="imageUrl" alt="" class="object-cover w-auto h-auto min-w-full max-w-64 max-h-96 mx-auto">
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { getCategoryListConfig, createProductConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { NewProduct } from '@/common/typings/product.typings'
    const imageUrl = ref('');
    const categoryStore = useCategoryStore();
    const productStore = useProductStore();
    const { categoryListData } = storeToRefs(categoryStore);
    const { productData } = storeToRefs(productStore);
    const config = getCategoryListConfig();
    categoryStore.getCategoryList(config);
    const newProduct = reactive<NewProduct>({
        name: '',
        price: null,
        discount: null,
        quantity: null,
        description: '',
        category: '',
    });
    const page = reactive<Page>({
        loading: false,
        message: '',
        typeMessage: TypeMessage.Success,
        showMessage: false,
    });
    
    const productFile = ref(null) as Ref<File | null | undefined>
    const onProductImageChange = (evt: Event) => {
        const target = evt.target as HTMLInputElement;
	    productFile.value = target.files?.item(0);
        if (productFile.value) {
            imageUrl.value = URL.createObjectURL(productFile.value);
        }
    };

    const additionalsFile = ref() as Ref<File[] | undefined>
    const additionalsImageUrl = ref(['']);
    const onAddintionalFileChange = (evt: Event) => {
        const target = evt.target as HTMLInputElement;
        if (target.files) {
            additionalsFile.value = [];
            for (const file of target.files) {
                additionalsFile.value?.push(file);
                additionalsImageUrl.value.push(URL.createObjectURL(file));
            }
        }
	    // productFile.value = target.files?.item(0);
        
        // if (productFile.value) {
        //     imageUrl.value = URL.createObjectURL(productFile.value);
        // }
    };

    const addProduct = async () => {
        try {
            page.loading = true;
            const formData = new FormData();
            !newProduct.discount && ( newProduct.discount = 0 );
            formData.append('name', newProduct.name);
            formData.append('price', `${newProduct.price}`);
            formData.append('discount', `${newProduct.discount}`);
            formData.append('quantity', `${newProduct.quantity}`);
            formData.append('product', productFile.value!);
            formData.append('category', newProduct.category);
            formData.append('description', newProduct.description!);
            const config = createProductConfig(formData);
            await productStore.createProduct(config);
            page.showMessage = true;
            page.typeMessage = TypeMessage.Success;
            page.message = productData.value?.message;
        } catch (error) {
            page.showMessage = true;
            page.typeMessage = TypeMessage.Danger;
            if (axios.isAxiosError(error)) {
               page.message = getAxiosErrorMessage(error);
            } else {
                console.log(error);
            }
        }
        page.loading = false;
    }
</script>