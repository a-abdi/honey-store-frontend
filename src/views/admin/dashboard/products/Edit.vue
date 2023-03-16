<template>
    <form @submit.prevent="updateProduct">
        <div class="sm:flex w-full">
            <div class="w-full sm:w-2/3 border border-gray-200 rounded-md p-2 sm:m-4">
                <div class="my-2 md:my-6">
                    <input @change="updateName" v-model="editProduct.name" id="name" type="text" :placeholder="productData?.data?.name" class="mt-2 w-full form-input text-right">
                </div>
                <div class="md:flex md:justify-between my-2">
                    <div class="w-full md:w-1/4 my-4 md:my-0">
                        <label for="price" class="text-sm mr-1 text-violet-700">قیمت</label>
                        <input @change="updatePrice" v-model="editProduct.price"    id="price"    type="number" min="1" :placeholder="`${productData?.data?.price}`"  class="mt-1 form-input text-right">
                    </div>
                    <div class="w-full md:w-1/4 my-4 md:my-0" >
                        <label for="discount" class="text-sm mr-1 text-violet-700">تخفیف</label>
                        <input @change="updateDiscount" v-model="editProduct.discount" id="discount" type="number" min="0" :placeholder="`${productData?.data?.discount}`" class="mt-1 form-input text-right">
                    </div>
                    <div class="w-full md:w-1/4 my-4 md:my-0">
                        <label for="quantity" class="text-sm mr-1 text-violet-700">تعداد</label>
                        <input @chamge="updateQuantity" v-model="editProduct.quantity" id="quantity" type="number" min="1" :placeholder="`${productData?.data?.quantity}`" class="mt-1 form-input text-right">
                    </div>
                </div>
                <div class="md:flex md:justify-between my-2 md:my-6">
                    <label class="block w-full md:w-1/4 my-2 md:my-0">
                        <span class="sr-only">انتخاب عکس محصول</span>
                        <input @change="onFileChange" type="file" class="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                        "/>
                    </label>
                    <select @change="updateCategory" v-model="editProduct.category" v-if="categoryListData?.data" name="category" autofocus="true" id="category" aria-placeholder="select category" class="w-full md:w-1/4 my-2 md:my-0 appearance-none bg-white text-gray-600 form-input text-right">
                        <option value="" disabled v-if="typeof productData?.data?.category == 'string'" selected>دسته</option>
                        <option value="" disabled v-else selected>{{ productData?.data?.category?.name }}</option>
                        <option v-for="category in categoryListData.data" :key="category._id" :value="category._id">{{ category.name }}</option>
                    </select>
                    <button :disabled="page.loading" :class="{'cursor-wait': page.loading}" type="submit" class="w-full md:w-1/4 my-2 md:my-0 btn-blue">
                        آپدیت 
                    </button>
                </div> 
                <div class="mt-6 mb-3 w-full">
                    <textarea @change="updateDescription" v-model="editProduct.description" :placeholder="productData?.data?.description" class="p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200 text-right"></textarea>
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
                    <img v-if="imageUrl" :src="imageUrl" alt="" class="object-cover w-auto h-auto min-w-full max-w-64 max-h-96 mx-auto">
                    <img v-else :src="productData?.data?.imageSrc" alt="" class="object-cover w-auto h-auto min-w-full max-w-64 max-h-96 mx-auto">
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { getCategoryListConfig, editProductConfig, getProductConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { useRoute } from 'vue-router';
import type { EditProduct, NewProduct } from '@/common/typings/product.typings';
import { TypeMessage, type Page } from '@/common/typings/common.typings';

    const route = useRoute();
    const productId = route.params.productId as string;
    const imageUrl = ref('');
    const categoryStore = useCategoryStore();
    const productStore = useProductStore();
    const { productData } = storeToRefs(productStore);
    const { categoryListData } = storeToRefs(categoryStore);
    const gategoryConfig = getCategoryListConfig();
    const productConfig = getProductConfig(productId);
    categoryStore.getCategoryList(gategoryConfig);
    productStore.getProduct(productConfig);
    const editProduct = reactive<Partial<NewProduct>>({
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

    const formData = new FormData();
    const imageFile = ref(null) as Ref<File | null | undefined>
    const onFileChange = (evt: Event) => {
        const target = evt.target as HTMLInputElement;
	    imageFile.value = target.files?.item(0);
        formData.append('file', imageFile.value!);
        if (imageFile.value) {
            imageUrl.value = URL.createObjectURL(imageFile.value);
        }
    };

    const updateName = () => {
        formData.append('name', editProduct.name!);
    };
    const updatePrice = () => {
        formData.append('price', `${editProduct.price}`);
    };
    const updateDiscount = () => {
        formData.append('discount', `${editProduct.discount}`);
    };
    const updateQuantity = () => {
        formData.append('quantity', `${editProduct.quantity}`);
    };
    const updateCategory = () => {
        formData.append('category', editProduct.category!);
    };
    const updateDescription = () => {
        formData.append('description', editProduct.description!);
    };
  
    const updateProduct = async () => {
        try {
            page.loading = true;
            const config = editProductConfig(productId, formData);
            await productStore.editProduct(config);
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