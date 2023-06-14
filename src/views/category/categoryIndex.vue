<template>
    <div>
        <SortIndex :category-id="categoryId" :sortList="SORT_PRODUCT" class="md:block hidden"/>
        <MobileSort :category-id="categoryId" :sortList="SORT_PRODUCT" class="md:hidden" />
        <div v-if="productListData" class="md:mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
            <ProductBox 
                v-for="product in productListData.data"
                :key="product._id"  
                :product="product"
                @click="showProduct(product._id, product.name)"
                class="cursor-pointer border border-gray-100 hover:shadow-2xl" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getProductListConfig } from '@/common/config/axiox.config';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import ProductBox from '@/components/ProductBox.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import SortIndex from '@/components/sort/SortIndex.vue';
import { SORT_PRODUCT } from '@/common/constans';
import MobileSort from '@/components/sort/MobileSort.vue';
const productStore = useProductStore();
const route = useRoute();
const categoryId = ref('');
const getProductData = () => {
    categoryId.value = route.params.categoryId as string;
    const query = route.query;
    let productFilter = `?category=${categoryId.value}`;
    if (Object.keys(query).some(value => value === 'sort')) {
        productFilter = productFilter.concat('&', `sort=${query.sort}`);
    }
    const config = getProductListConfig(productFilter);
    productStore.getProductList(config);
};
watch(
    () => route.fullPath,
    () => getProductData()
);
getProductData();
const { productListData } = storeToRefs(productStore);
const showProduct = (productId: string, productName: string) => { 
    console.log(productName);
    
    router.push(`/products/${productId}/${productName.replace(/ /g, '-')}`)
    };
</script>