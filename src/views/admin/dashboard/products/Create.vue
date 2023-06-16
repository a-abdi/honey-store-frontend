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
                        <input v-model="newProduct.price" id="price" type="number" min="1" placeholder="قیمت" class="w-full  my-2 md:my-0 form-input text-right">
                    </div>
                    <div class="px-2 w-full">
                        <input v-model="newProduct.discount" id="discount" type="number" min="0" placeholder="تخفیف" class="w-full  my-2 md:my-0 form-input text-right">
                    </div>
                </div>
                <div class="md:flex md:items-center md:justify-between my-2 md:my-6">
                    <div class="px-2 w-full ">
                        <select @change="showProperties" v-model="newProduct.category" v-if="categoryListData?.data"
                            name="category" autofocus="true" id="category" aria-placeholder="select category"
                            class="w-full  my-2 md:my-0 appearance-none bg-white text-gray-600 form-input text-right">
                            <option value="" disabled selected>دسته</option>
                            <option v-for="category in categoryListData.data" :key="category._id" :value="category._id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>
                    <div class="px-2 w-full ">
                        <button type="submit" class="w-full my-2 md:my-0 btn-blue">
                            اضافه کردن محصول
                        </button>
                    </div>
                </div>
                <div class="flex justify-between md:items-center my-2">
                    <div class="w-full my-2 md:my-0 text-center">
                        <label for="productImage" class="btn-violet cursor-pointer p-2 border border-gray-200"> تصویر
                            محصول</label>
                        <input id="productImage" hidden @change="onFileChange($event, productImage)" type="file" />
                    </div>
                    <div class="w-full my-2 md:my-0 text-center">
                        <label for="addintionalFile" class="btn-violet cursor-pointer p-2 border border-gray-200">تصویر
                            بیشتر</label>
                        <input hidden id="addintionalFile" @change="onFileChange($event, additionalsImage)" type="file"
                            multiple="true" />
                    </div>
                </div>
                <div class="mt-6 mb-3 w-full">
                    <textarea v-model="newProduct.description" placeholder="توضیحات"
                        class="p-2 text-gray-600 resize-y border rounded-md w-full h-16 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200 text-right"></textarea>
                </div>
                <div class="flex items-center mt-6 mb-3 w-full">
                    <div v-for="additionalImage of additionalsImage" class="px-2">
                        <img v-if="additionalImage.url" :src="additionalImage.url" alt="" class="object-cover sm:w-10 sm:h-12 w-8 h-10 mx-auto">
                    </div>
                    <div v-for="attach of attachImage" class="px-2">
                        <img v-if="attach.url" :src="attach.url" alt="" class="object-cover sm:w-10 sm:h-12 w-8 h-10 mx-auto">
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
                    <img v-if="productImage[0]?.url" :src="productImage[0].url" alt="" class="object-cover w-auto h-auto sm:min-w-full max-w-full max-h-72 mx-auto">
                </div>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="table-auto w-full tracking-wider min-w-lg">
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
                    <tr v-for="( property, index ) in propertyListData.data" :key="property._id"
                        :class="{ 'bg-neutral-100': (index + 1) % 2 }">
                        <td class="table-td"> {{ property.label }} </td>
                        <td class="table-td">
                            <input :id="`${property._id}-file`" :disabled="!propertyListId.includes(property._id)"
                                v-if="property.type == 'file'" @change="onFileChange($event, attachImage)" type="file"
                                class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100">
                            <input :id="`${property._id}-text`" :disabled="!propertyListId.includes(property._id)"
                                v-if="property.type == 'text'" v-model="propertyListValue[property._id]" type="text"
                                class="form-input">
                            <input :id="`${property._id}-number`" :disabled="!propertyListId.includes(property._id)"
                                v-if="property.type == 'number'" v-model="propertyListValue[property._id]" type="number"
                                class="form-input">
                        </td>
                        <td class="table-td"> {{ property.type }} </td>
                        <td class="table-td">
                            <div v-if="property.unit?.length">
                                <select v-model="propertyListUnit[property._id]"
                                    autofocus="true" :id="`${property._id}-create-product`"
                                    class="w-full my-2 md:my-0 bg-white text-gray-600 form-input text-right">
                                    <option value="" disabled selected="true">واحد</option>
                                    <option v-for="unit in property.unit" :key="unit" :value="unit">
                                        {{ unit }}
                                    </option>
                                </select>
                            </div>
                        </td>
                        <td class="table-td">
                            <input type="checkbox" v-model="propertyListId" :id="property._id" :value="property._id" class="accent-violet-600">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { getCategoryListConfig, createProductConfig, getProperyListConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page, type Image, type StringObject } from '@/common/typings/common.typings';
import type { NewProduct, ProductProperty } from '@/common/typings/product.typings'
import { usePropertyStore } from '@/stores/property';
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const propertyStore = usePropertyStore();
const propertyListId = ref([]) as Ref<string[]>;
const propertyListValue = reactive<StringObject>({});
const propertyListUnit = reactive<StringObject>({});
const { categoryListData } = storeToRefs(categoryStore);
const { propertyListData } = storeToRefs(propertyStore);
const { productData } = storeToRefs(productStore);
const categoryConfig = getCategoryListConfig();
const propertyConfig = getProperyListConfig();
categoryStore.getCategoryList(categoryConfig);
propertyStore.getPropertyList(propertyConfig);
const additionalsImage = reactive<Image[]>([]);
const productImage = reactive<Image[]>([]);
const attachImage = reactive<Image[]>([]);
const newProduct = reactive<NewProduct>({
    name: '',
    price: null,
    discount: null,
    quantity: null,
    description: '',
    category: '',
});
const page = reactive<Page>({
    message: '',
    typeMessage: TypeMessage.Success,
    showMessage: false,
});
const showProperties = () => {
    const category = categoryListData.value?.data.find(category => category._id === newProduct.category)
    if (category?.properties) {
        for (const property of category?.properties) {
            propertyListId.value.push(property._id)
        }
    }
    propertyListData.value?.data.sort(a => {
        if (propertyListId.value.some(property => property == a._id)) {
            return -1;
        }
        return 0;
    });
};
const onFileChange = (event: Event, images: Image[]) => {
    const target = event.target as HTMLInputElement;
    const id = target.id;
    // delete old image in images
    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        if (image?.id == id) {
            images.splice(index, 1);
            index--;
        }
    }
    if (target.files) {
        for (const file of target.files) {
            if (images.length >= 4) {
                page.showMessage = true;
                page.typeMessage = TypeMessage.Danger;
                page.message = "تعداد تصاویر ضمینه یا تصاویر بیشتر نمی تواند بیشتر از ۴ عدد باشد";
                break;
            }
            const image: Image = {
                file,
                url: URL.createObjectURL(file),
                id,
            };
            images.push(image);
        }
    }
};

const fillProductProperty = (property: any ) => {
    const productProperty: ProductProperty = {
        label: property.label,
        type: property.type,
    }
    if (propertyListUnit[property._id]) {
        productProperty.unit = propertyListUnit[property._id];
    }
    if (property.type == 'file' && attachImage.length > 0) {
        const image = attachImage.find(attach => attach.id == property._id);
        productProperty.value = image?.file?.size;
    } else {
        productProperty.value = propertyListValue[property._id];
    }
    return productProperty
};

const fillFormDataProperty = (formData: FormData, productProperty: ProductProperty, index: number) => {
    formData.append('customProperty['+ index +'][label]', productProperty.label);
    formData.append('customProperty['+ index +'][type]', productProperty.type);
    productProperty.unit && formData.append('customProperty['+ index +'][unit]', productProperty.unit);
    productProperty.value && formData.append('customProperty['+ index +'][value]', productProperty.value);
};

const fillFileInFormdata = (formData: FormData, files: Image[], fileName: string) => {
    for (let index = 0; index < files.length; index++) {
        if (files[index]?.file) {
            formData.append(fileName, files[index].file!);
        }
    }
};

const addProduct = async () => {
    try {
        if (!productImage[0]?.file) {
            throw new TypeError("تصویر محصول باید وارد شود");
        }
        const formData = new FormData();
        // get all property which user selected
        const productProperties = propertyListData.value?.data.filter(property =>  
            propertyListId.value.includes(property._id)
        );
        if (productProperties) {
            for (let index = 0; index < productProperties.length; index++) {
                const property = productProperties[index];
                const productProperty: ProductProperty = fillProductProperty(property);
                fillFormDataProperty(formData, productProperty, index)
            }
        }
        fillFileInFormdata(formData, additionalsImage, 'additionals');
        fillFileInFormdata(formData, attachImage, 'attach');
        fillFileInFormdata(formData, productImage, 'product');
        !newProduct.discount && (newProduct.discount = 0);
        formData.append('name', newProduct.name);
        formData.append('price', `${newProduct.price}`);
        formData.append('discount', `${newProduct.discount}`);
        formData.append('quantity', `${newProduct.quantity}`);
        formData.append('category', newProduct.category);
        formData.append('description', newProduct.description!);
        const config = createProductConfig(formData);
        await productStore.createProduct(config);
        page.showMessage = true;
        page.typeMessage = TypeMessage.Success;
        page.message = productData.value?.message;
    } catch (error: any) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            page.message = getAxiosErrorMessage(error);
        } else {
            page.message = error.message;
            console.log(error);
        }
    }
}
</script>