<template>
    <div class="">
        <ConfirmDialog :showDialog="showDialog" @hard-delete="deleteProduct" @safe-delete="safeDelete"  @cancel=" showDialog = false">
            <div class="text-right my-4 text-purple-600">
               <p>محصول مورد نظر حذف شود؟</p>
            </div>
        </ConfirmDialog>
        <RestoreDialog :showDialog="showRestoreDialog" @restore="restoreProduct"  @cancel=" showRestoreDialog = false">
            <div class="text-right my-4 text-purple-600">
               <p> محصول مورد نظر بازیابی می کنید؟ </p>
            </div>
        </RestoreDialog>
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
                    <th class="table-tr">کد</th>
                    <th class="table-tr">قیمت</th>
                    <th class="table-tr">تخفیف</th>
                    <th class="table-tr">تعداد</th>
                    <th class="table-tr" v-if="route.query?.deletedAt === 'true'">بازگرداندن</th>
                    <th class="table-tr">ویرایش</th>
                    <th class="table-tr">حذف</th>
                </tr>
            </thead>
            <tbody v-if="productListData?.data?.length">
                <tr v-for="( product, index ) in productListData.data" :key="product._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td">
                        <router-link class="" :to="`/admin/dashboard/products/${product._id}`">
                                {{ product.name }} 
                        </router-link>
                    </td>
                    <td class="table-td"> {{ product.code }} </td>
                    <td class="table-td"> <Currency :money="product.price" /> </td>
                    <td class="table-td"> <Currency :money="product.discount" /> </td>
                    <td class="table-td"> <Currency :money="product.quantity" /> </td>
                    <td class="table-td" v-if="route.query?.deletedAt === 'true'"> 
                        <RestoreElement @restore="showRestoreDialog = true, productId = product._id"/> 
                    </td>
                    <td class="table-td"> 
                        <router-link :to="`/admin/dashboard/products/${product._id}/edit`">
                            <EditElement/>
                        </router-link> 
                    </td>
                    <td class="table-td"> 
                        <DeleteElement @delete="showDialog = true, productId = product._id"/> 
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { deleteProductConfig, getProductListConfig, safeDeleteProductConfig, restoreProductConfig } from '@/common/config/axiox.config';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { reactive, ref, watch } from 'vue';
import Currency from '../../../../components/Currency.vue';
import EditElement from '@/components/element/EditElement.vue';
import DeleteElement from '@/components/element/DeleteElement.vue';
import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';
import Message from '@/components/message/Message.vue';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { useRoute } from 'vue-router';
import RestoreElement from '@/components/element/RestoreElement.vue';
import RestoreDialog from '@/components/dialog/RestoreDialog.vue';
    const productStore = useProductStore();
    const showDialog = ref(false);
    const showRestoreDialog = ref(false);
    const productId = ref('');
    const route = useRoute();
    const getProductList = async (deletedAt: boolean) => {
        const filter = `?deletedAt=${deletedAt}`;
        const config = getProductListConfig(filter);
        productStore.getProductList(config);
    };
    getProductList(route.query?.deletedAt === 'true');
    watch(
        () => route.query,
        query => {
            if (query?.deletedAt) {
                getProductList(query?.deletedAt === 'true');
            }
        }
    );
    const form = reactive<Page>({
        message: '',
        typeMessage: TypeMessage.Success,
        showMessage: false,
    });
    const { productData } = storeToRefs(productStore);
    const { productListData } = storeToRefs(productStore);
    const deleteProduct = async () => {
        try {
            showDialog.value = false;
            const config = deleteProductConfig(productId.value);
            await productStore.deleteProduct(config);
            form.showMessage = true;
            form.typeMessage = TypeMessage.Success;
            form.message = productData.value?.message;
            getProductList(route.query?.deletedAt === 'true');
        } catch (error) {
            form.showMessage = true;
            form.typeMessage = TypeMessage.Danger;
            if (axios.isAxiosError(error)) {
               form.message = getAxiosErrorMessage(error);
            } else {
                console.log(error);
            }
        }
    };
    const safeDelete = async () => {
        try {
            showDialog.value = false;
            const config = safeDeleteProductConfig(productId.value);
            await productStore.editProduct(config);
            form.showMessage = true;
            form.typeMessage = TypeMessage.Success;
            form.message = productData.value?.message;
            getProductList(route.query?.deletedAt === 'true');
        } catch (error) {
            form.showMessage = true;
            form.typeMessage = TypeMessage.Danger;
            if (axios.isAxiosError(error)) {
               form.message = getAxiosErrorMessage(error);
            } else {
                console.log(error);
            }
        }
    };
    const restoreProduct = async () => {
        try {
            showRestoreDialog.value = false;
            const config = restoreProductConfig(productId.value);
            await productStore.editProduct(config);
            form.showMessage = true;
            form.typeMessage = TypeMessage.Success;
            form.message = productData.value?.message;
            getProductList(route.query?.deletedAt === 'true');
        } catch (error) {
            form.showMessage = true;
            form.typeMessage = TypeMessage.Danger;
            if (axios.isAxiosError(error)) {
               form.message = getAxiosErrorMessage(error);
            } else {
                console.log(error);
            }
        }
    };
</script>