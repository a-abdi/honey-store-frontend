<template>
    <div class="">
        <ConfirmDialog :showDialog="showDialog" @yes="deleteProduct"  @cancel=" showDialog = false">
            <div class="text-right my-4 text-purple-600">
               <p>محصول مورد نظر حذف شود؟</p>
            </div>
        </ConfirmDialog>
        <Message class="absolute bottom-4 right-4 bg-gray-300" 
                :message="form.message"
                :showMessage="form.showMessage"
                :typeMessage="form.typeMessage"
                @fadeMessage="form.showMessage = false" 
            />
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr">نام</th>
                    <th class="table-tr">قیمت</th>
                    <th class="table-tr">تخفیف</th>
                    <th class="table-tr">تعداد</th>
                    <th class="table-tr">ویرایش</th>
                    <th class="table-tr">حذف</th>
                </tr>
            </thead>
            <tbody v-if="productListData?.data?.length">
                <tr v-for="( product, index ) in productListData.data" :key="product._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td">
                        <div class="">
                            <router-link class="flex items-center flex mr-2" :to="`/admin/dashboard/products/${product._id}`">
                                <div>
                                    <img class="object-cover h-8 w-8 rounded-md " :src="product.imageSrc" alt="">
                                </div>
                                <div class="pr-1">
                                    {{ product.name }} 
                                </div>
                            </router-link>
                        </div>
                    </td>
                    <td class="table-td"> <Currency :money="product.price" /> </td>
                    <td class="table-td"> <Currency :money="product.discount" /> </td>
                    <td class="table-td"> <Currency :money="product.quantity" /> </td>
                    <td class="table-td"> 
                        <router-link :to="`/admin/dashboard/products/${product._id}/edit`">
                            <EditElement/>
                        </router-link> 
                    </td>
                    <td class="table-td"> 
                        <DeleteElement @delete="showDialog = true, productId= product._id"/> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { deleteProductConfig, getProductListConfig } from '@/common/config/axiox.config';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref } from 'vue';
import Currency from '../../../../components/Currency.vue';
import EditElement from '@/components/element/EditElement.vue';
import DeleteElement from '@/components/element/DeleteElement.vue';
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';
import Message from '@/components/message/Message.vue';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';

    const productStore = useProductStore();
    const showDialog = ref(false);
    const productId = ref('');
    const getProductList = async () => {
        const config = getProductListConfig();
        productStore.getProductList(config)
    };
    const form = reactive<Page>({
        message: '',
        typeMessage: TypeMessage.Success,
        showMessage: false,
    });
    const { productData } = storeToRefs(productStore);
    onMounted(getProductList);
    const { productListData } = storeToRefs(productStore);
    const deleteProduct = async () => {
        try {
            const config = deleteProductConfig(productId.value);
            showDialog.value = false;
            await productStore.deleteProduct(config);
            form.showMessage = true;
            form.typeMessage = TypeMessage.Success;
            form.message = productData.value?.message;
            getProductList();
        } catch (error) {
            form.showMessage = true;
            form.typeMessage = TypeMessage.Danger;
            if (axios.isAxiosError(error)) {
               form.message = getAxiosErrorMessage(error);
            } else {
                console.log(error);
            }
        }
    }
</script>