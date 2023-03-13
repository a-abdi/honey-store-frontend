<template>
    <div class="">
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr">حذف</th>
                    <th class="table-tr">ویرایش</th>
                    <th class="table-tr">تعداد</th>
                    <th class="table-tr">تخفیف</th>
                    <th class="table-tr">قیمت</th>
                    <th class="table-tr">نام</th>
                </tr>
            </thead>
            <tbody v-if="productListData?.data?.length">
                <tr v-for="( product, index ) in productListData.data" :key="product._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td"> <button @click="deleteProduct(product._id)" class="btn-red"> حذف </button> </td>
                    <td class="table-td"> <router-link :to="`/admin/dashboard/products/${product._id}/edit`" class="btn-yellow"> ویرایش </router-link> </td>
                    <td class="table-td"> <Currency :money="product.quantity" /> </td>
                    <td class="table-td"> <Currency :money="product.discount" /> </td>
                    <td class="table-td"> <Currency :money="product.price" /> </td>
                    <td class="table-td">
                        <div class="">
                            <router-link class="flex items-center float-right pr-2" :to="`/admin/dashboard/products/${product._id}`">
                                <div class="pr-1">
                                    {{ product.name }} 
                                </div>
                                <div>
                                    <img class="object-cover h-8 w-8 rounded-md " :src="product.imageSrc" alt="">
                                </div>
                            </router-link>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { getProductListConfig } from '@/common/config/axiox.config';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import Currency from '../../../../components/Currency.vue';
    const productStore = useProductStore();

    const getProductList = async () => {
        const config = getProductListConfig();
        productStore.getProductList(config)
    };
    onMounted(getProductList);
    const { productListData } = storeToRefs(productStore);
    const deleteProduct = async (productId: string) => {
        const answer = window.confirm(
            'Do you really want to delete product?'
        )
        try {
            if(answer) {
                // await store.dispatch('adminProducts/deleteProduct', productId)
                // store.dispatch('adminProducts/getProducts')
            } 
        } catch (error) {
            
        }
    }
</script>