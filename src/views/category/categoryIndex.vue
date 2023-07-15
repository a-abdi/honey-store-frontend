<template>
    <div>
        <SortIndex :path="`/category/${categoryId}/`" :sortList="SORT_PRODUCT" class="md:block hidden"/>
        <MobileSort :path="`/category/${categoryId}/`" :sortList="SORT_PRODUCT" class="md:hidden" />
        <div ref="showProducts" v-if="productListDataLazy" class="md:mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
            <ProductBox 
                v-for="product in productListDataLazy.data"
                :key="product._id"  
                :product="product"
                @click="showProduct(product._id, product.name)"
                class="cursor-pointer border border-gray-100 hover:shadow-2xl" 
            />
        </div>
        <PageLoading v-else/>
    </div>
</template>

<script setup lang="ts">
import { getProductListConfig } from '@/common/config/axios/product.config';
import { useProductStore } from '@/stores/product';
import { storeToRefs } from 'pinia';
import ProductBox from '@/components/ProductBox.vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import SortIndex from '@/components/sort/SortIndex.vue';
import { SORT_PRODUCT } from '@/common/constans';
import MobileSort from '@/components/sort/MobileSort.vue';
import PageLoading from '@/components/loading/PageLoading.vue';

const showProducts = ref<HTMLDivElement>();
const receivedData = ref(false);
const productStore = useProductStore();
const route = useRoute();
const { productListDataLazy, productListData } = storeToRefs(productStore);
const categoryId = ref('');
const getProductData = () => {
    categoryId.value = route.params.categoryId as string;
    const query = route.query;
    let productFilter = `?category=${categoryId.value}`;
    if (Object.keys(query).some(value => value === 'sort')) {
        productFilter = productFilter.concat('&', `sort=${query.sort}`);
    }
    if (productListData.value?.metaData?.nextPage) {
        productFilter = productFilter.concat('&', `nextPage=${productListData.value.metaData.nextPage}`);
    }
    const config = getProductListConfig(productFilter);
    productStore.getProductList(config);
};
watch(
    () => route.fullPath,
    () => { 
        productStore.resetProductList();
        getProductData();
    }
);
productStore.resetProductList();
getProductData();
const onScroll = () => {
  const marginBottomProduct = showProducts.value?.getBoundingClientRect().bottom || window.innerHeight;
  const innerHeight  = window.innerHeight; 
  if( 
    marginBottomProduct - innerHeight < 50 
    && !receivedData.value 
    && productListData.value?.metaData?.nextPage
    ) {
    receivedData.value = true;
    getProductData();
  } else {
    receivedData.value = false;
  }
};
onMounted(() => {
  window.addEventListener('scroll', onScroll)
});
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
});
const showProduct = (productId: string, productName: string) => { 
    router.push(`/products/${productId}/${productName.replace(/ /g, '-')}`)
};
</script>