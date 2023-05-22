<template>
    <form @submit.prevent="addProduct">
        <div class="sm:flex w-full">
            <div class="w-full sm:w-2/3 border border-gray-200 rounded-md p-2 sm:m-4">
                <div class="md:flex md:justify-between my-2 md:my-6">
                    <div class="px-2 w-full ">
                        <input v-model="newProduct.name" id="name" type="text" placeholder="نام" class="w-full my-2 md:my-0 form-input text-right">
                    </div>
                    <div class="px-2 w-full ">
                        <input v-model="newProduct.quantity" id="quantity" type="number" min="1" placeholder="تعداد" class="w-full my-2 md:my-0 form-input text-right">
                    </div>
                </div>
                <div class="md:flex md:justify-between md:items-center my-2">
                    <div class="px-2 w-full">
                        <input v-model="newProduct.price"    id="price"    type="number" min="1" placeholder="قیمت"  class="w-full  my-2 md:my-0 form-input text-right">
                    </div>
                    <div class="px-2 w-full">
                        <input v-model="newProduct.discount" id="discount" type="number" min="0" placeholder="تخفیف" class="w-full  my-2 md:my-0 form-input text-right">
                    </div>

                </div>
                <div class="md:flex md:items-center md:justify-between my-2 md:my-6">
                    <div class="px-2 w-full ">

                        <select @change="showProperties" v-model="newProduct.category" v-if="categoryListData?.data" name="category" autofocus="true" id="category" aria-placeholder="select category" class="w-full  my-2 md:my-0 appearance-none bg-white text-gray-600 form-input text-right">
                            <option value="" disabled selected>دسته</option>
                            <option v-for="category in categoryListData.data" :key="category._id" :value="category._id">{{ category.name }}</option>
                        </select>
                    </div>
                    <div class="px-2 w-full ">

                        <button :disabled="page.loading" :class="{'cursor-wait': page.loading}" type="submit" class="w-full  my-2 md:my-0 btn-blue">
                            اضافه کردن محصول 
                        </button>
                    </div>
                   
                </div> 
                <div class="md:flex md:justify-between md:items-center my-2">
                    <div class="block w-full my-2 md:my-0 text-center">
                        <label for="productImage" class="btn-violet cursor-pointer p-2 border border-gray-200"> تصویر محصول</label>
                        <input id="productImage" hidden @change="onProductImageChange" type="file"/>
                    </div>
                    <div class="block w-full my-2 md:my-0 text-center">
                        <label for="addintionalFile" class="btn-violet cursor-pointer p-2 border border-gray-200">تصویر بیشتر</label>
                        <input hidden id="addintionalFile" @change="onAddintionalFileChange" type="file" multiple="true" />
                    </div>
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
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr">برچسب</th>
                    <th class="table-tr">مقدار</th>
                    <th class="table-tr">نوع</th>
                    <th class="table-tr">واحد</th>
                    <th class="table-tr">اضافه کردن</th>
                </tr>
            </thead>
            <tbody v-if="propertyListData?.data?.length">
                <tr v-for="( property, index ) in propertyListData.data" :key="property._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td"> {{ property.label }} </td>
                    <td class="table-td"> 
                        <input v-if="property.type == 'file'" type="file" multiple="true" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" >
                        <input v-if="property.type == 'input'" type="text" class="form-input">
                        <input v-if="property.type == 'number'" type="number" class="form-input">
                    </td>
                    <td class="table-td"> {{ property.type }} </td>
                    <td class="table-td"> 
                        <div v-if="property.unit?.length">
                            <div class="" v-for="unit of property.unit">
                                {{ unit }}
                            </div>
                        </div>
                    </td>
                    <td class="table-td"> 
                        <input type="checkbox" v-model="properties" :id="property._id" :value="property._id" class="accent-violet-600"> 
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { getCategoryListConfig, createProductConfig, getProperyListConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { NewProduct } from '@/common/typings/product.typings'
import { usePropertyStore } from '@/stores/property';
    const imageUrl = ref('');
    const categoryStore = useCategoryStore();
    const productStore = useProductStore();
    const propertyStore = usePropertyStore();
    const properties = ref() as Ref<string[]>;
    const { categoryListData } = storeToRefs(categoryStore);
    const { propertyListData } = storeToRefs(propertyStore);
    const { productData } = storeToRefs(productStore);
    const categoryConfig = getCategoryListConfig();
    const propertyConfig = getProperyListConfig();
    categoryStore.getCategoryList(categoryConfig);
    propertyStore.getPropertyList(propertyConfig);
    const newProduct = reactive<NewProduct>({
        name: '',
        price: null,
        discount: null,
        quantity: null,
        description: '',
        category: '',
        customProperty: []
    });
    const page = reactive<Page>({
        loading: false,
        message: '',
        typeMessage: TypeMessage.Success,
        showMessage: false,
    });

    const showProperties = () => {
        const category = categoryListData.value?.data.find(category => category._id === newProduct.category)
        properties.value = [];
        if (category?.properties) {
            for (const property of category?.properties) {
                properties.value.push(property._id)
            }
        }
        propertyListData.value?.data.sort(a => {
            if (properties.value.some(property => property == a._id)) {
                return -1;
            }
            return 0;
        });
        
    };

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