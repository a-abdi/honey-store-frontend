<template>
    <div>
        <form v-if="productData" @submit.prevent="addProduct">
            <div class="sm:flex w-full">
                <div class="w-full sm:w-2/3 border border-gray-200 rounded-md p-2 sm:m-4">
                    <div class="md:flex md:justify-between my-2 md:my-6">
                        <div class="px-2 w-full ">
                            <input v-model="newProduct.name" id="name" type="text" :placeholder="productData?.data?.name" class="w-full my-2 md:my-0 form-input text-right">
                        </div>
                        <div class="px-2 w-full ">
                            <input v-model="newProduct.quantity" id="quantity" type="number" min="1" :placeholder="productData?.data?.quantity.toString()" class="w-full my-2 md:my-0 form-input text-right">
                        </div>
                    </div>
                    <div class="md:flex md:justify-between md:items-center my-2">
                        <div class="px-2 w-full">
                            <input v-model="newProduct.price" id="price" type="number" min="1" :placeholder="productData?.data?.price.toString()" class="w-full  my-2 md:my-0 form-input text-right">
                        </div>
                        <div class="px-2 w-full">
                            <input v-model="newProduct.discount" id="discount" type="number" :placeholder="productData?.data?.discount.toString()" class="w-full  my-2 md:my-0 form-input text-right">
                        </div>
                    </div>
                    <div class="md:flex md:items-center md:justify-between my-2 md:my-6">
                        <div class="px-2 w-full ">
                            <select @change="showProperties" v-model="newProduct.category" v-if="categoryListData?.data"
                                name="category" autofocus="true" id="category" aria-placeholder="select category"
                                class="w-full  my-2 md:my-0 appearance-none bg-white text-gray-600 form-input text-right">
                                <option value="" disabled v-if="typeof productData?.data?.category == 'string'" selected>دسته</option>
                                <option value="" disabled v-else selected>{{ productData?.data?.category?.name }}</option>
                                <option v-for="category in categoryListData.data" :key="category._id" :value="category._id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                        <div class="px-2 w-full ">
                            <button :disabled="page.sending" :class="{'cursor-wait': page.sending}" type="submit" class="w-full my-2 md:my-0 btn-blue">
                                آپدیت محصول
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between items-center my-2">
                        <div class="block w-full my-2 md:my-0 text-center">
                            <label for="productImage" class="btn-violet cursor-pointer p-2 border border-gray-200"> تصویر
                                محصول</label>
                            <input id="productImage" hidden @change="onFileChange($event, productImage)" type="file" />
                        </div>
                        <div class="block w-full my-2 md:my-0 text-center">
                            <label for="addintionalFile" class="btn-violet cursor-pointer p-2 border border-gray-200">تصویر
                                بیشتر</label>
                            <input hidden id="addintionalFile" @change="onFileChange($event, additionalsImage)" type="file"
                                multiple="true" />
                        </div>
                    </div>
                    <div class="mt-6 mb-3 w-full">
                        <textarea v-model="newProduct.description" :placeholder="productData?.data?.description"
                            class="md:text-sm text-vsl p-2 text-gray-600 resize-y border rounded-md w-full h-20 sm:h-24 md:h-32 xl:h-40 focus:outline-none focus:ring-2 focus:ring-blue-200 text-right"></textarea>
                    </div>
                    <div class="flex flex-wrap items-center mt-6 mb-3 w-full">
                        <div class="flex items-center py-1" v-if="additionalsImage.length">
                            <div v-for="additionalImage of additionalsImage" class="px-2">
                                <img v-if="additionalImage.url" :src="additionalImage.url" alt="" class="object-cover sm:w-10 sm:h-12 w-8 h-10 mx-auto">
                            </div>
                        </div>
                        <div class="flex items-center py-1" v-else>
                            <div v-for="additionalImage of productData?.data?.additionalsImageSrc" class="px-2">
                                <img v-if="additionalImage" :src="additionalImage" alt="" class="object-cover sm:w-10 sm:h-12 w-8 h-10 mx-auto">
                            </div>
                        </div>
                        <div class="flex items-center py-1" v-if="attachImage.length">
                            <div v-for="attach of attachImage" class="px-2">
                                <img v-if="attach.url" :src="attach.url" alt="" class="object-cover sm:w-10 sm:h-12 w-8 h-10 mx-auto">
                            </div>
                        </div>
                        <div class="flex items-center py-1" v-else>
                            <div v-for="property of productData?.data?.customProperty" class="px-2">
                                <img v-if="property.type == 'file' && typeof property.value == 'string'" :src="property.value" alt="" class="object-cover sm:w-10 sm:h-12 w-8 h-10 mx-auto">
                            </div>
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
                        <img v-if="productData?.data?.productImagesSrc" :src="productImage[0]?.url || productData?.data?.productImagesSrc[0]" alt="" class="object-cover w-auto h-auto min-w-full max-w-64 max-h-96 mx-auto">
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
                                    class="form-input" :placeholder="`${findProductProperty(property)?.value || ''}`">
                                <input :id="`${property._id}-number`" :disabled="!propertyListId.includes(property._id)"
                                    v-if="property.type == 'number'" v-model="propertyListValue[property._id]" type="number"
                                    class="form-input" :placeholder="`${findProductProperty(property)?.value || ''}`">
                            </td>
                            <td class="table-td"> {{ property.type }} </td>
                            <td class="table-td">
                                <div v-if="property.unit?.length">
                                    <select v-model="propertyListUnit[property._id]"
                                        autofocus="true" :id="`${property._id}-product-edit`"
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
        <PageLoading v-else/>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref, onMounted } from 'vue';
import { useCategoryStore } from '@/stores/category';
import { getProperyListConfig, getProductConfig, editProductConfig } from '@/common/config/axiox.config';
import { getCategoryListConfig } from '@/common/config/axios/category.config';
import { storeToRefs } from 'pinia';
import { useProductStore } from '@/stores/product';
import Message from '@/components/message/Message.vue';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page, type Image, type StringObject } from '@/common/typings/common.typings';
import type { NewProduct, ProductProperty } from '@/common/typings/product.typings'
import { usePropertyStore } from '@/stores/property';
import { useRoute } from 'vue-router';
import type { Property } from '@/common/typings/property.typing';
import PageLoading from '@/components/loading/PageLoading.vue';
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
const additionalsImage = reactive<Image[]>([]);
const route = useRoute();
const productId = route.params.productId as string;
const getProductAxiosConfig = getProductConfig(productId);
const productImage = reactive<Image[]>([]);
const attachImage = reactive<Image[]>([]);
const newProduct = reactive<Partial<NewProduct>>({
    name: '',
    price: null,
    discount: null,
    quantity: null,
    description: '',
    category: '',
});
const page = reactive<Page>({
    sending: false,
    message: '',
    typeMessage: TypeMessage.Success,
    showMessage: false,
});
const findProductProperty = (property: Property) => {
    return productData?.value?.data?.customProperty.find(productProperty=> property.label == productProperty.label);
};
onMounted(async () => {
    await Promise.all([
        productStore.getProduct(getProductAxiosConfig),
        propertyStore.getPropertyList(propertyConfig)
    ]);
    if (productData.value?.data?.customProperty) {
        for (const productProperty of productData.value?.data?.customProperty) {
            const property = propertyListData.value?.data.find(property => property.label == productProperty.label);
            property && propertyListId.value.push(property?._id)
        }
    }
    propertyListData.value?.data.sort(a => {
        if (propertyListId.value.some(property => property == a._id)) {
            return -1;
        }
        return 0;
    });
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

const fillProductProperty = (property: Property ) => {
    const productProperty: ProductProperty = {
        label: property.label,
        type: property.type,
    }
    if (propertyListUnit[property._id]) {
        productProperty.unit = ( propertyListUnit[property._id] || findProductProperty(property)?.unit);
    }
    if (property.type == 'file') {
        const image = attachImage.find(attach => attach.id == `${property._id}-file`);
        productProperty.value = ( image?.file?.size || findProductProperty(property)?.value );
    } else {
        productProperty.value = ( propertyListValue[property._id] || findProductProperty(property)?.value);
    }
    return productProperty;
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
        additionalsImage.length && fillFileInFormdata(formData, additionalsImage, 'additionals');
        attachImage.length && fillFileInFormdata(formData, attachImage, 'attach');
        productImage.length && fillFileInFormdata(formData, productImage, 'product');
        newProduct.name && formData.append('name', newProduct.name);
        newProduct.discount && formData.append('discount', newProduct.discount.toString()); 
        newProduct.price && formData.append('price', newProduct.price.toString());
        newProduct.quantity && formData.append('quantity', newProduct.quantity.toString());
        newProduct.category && formData.append('category', newProduct.category);
        newProduct.description && formData.append('description', newProduct.description);
        const config = editProductConfig(productId, formData);
        page.sending = true;
        await productStore.editProduct(config);
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
    page.sending = false;
}
</script>