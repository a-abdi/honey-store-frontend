<template>
    <div class="px-4 py-1">
      <div v-if="searchData" class="md:mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          <ProductBox 
            v-for="product in searchData.data"
            :key="product._id"  
            :product="product"
            @click="showProduct(product._id, product.name)"
            class="cursor-pointer border border-gray-100 hover:shadow-2xl" 
          />
      </div>
      <PageLoading v-else/>
      <div v-if="searchData?.data.length == 0">
        <div class="flext items-center text-center text-indigo-900 lg:text-4xl md:text-3xl text-2xl pt-28">
          کالای پیدا نشد
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ProductBox from '@/components/ProductBox.vue';
import router from '@/router';
import PageLoading from '@/components/loading/PageLoading.vue';
import { useRoute } from 'vue-router';
import { useSearchStore } from '@/stores/search';
import { searchAxiosConfig } from '@/common/config/axios/searchConfig';
import { watch } from 'vue';
const searchStore = useSearchStore();
const route = useRoute();
const getProductData = () => {
    const query = route.query;
    const searchQuery = `?q=${query.q}`;
    const config = searchAxiosConfig(searchQuery);
    searchStore.search(config);
};
watch(
    () => route.fullPath,
    () => getProductData()
)
getProductData();
const { searchData } = storeToRefs(searchStore);
const showProduct = (productId: string, productName: string) => router.push(`/products/${productId}/${productName.replace(/ /g, '-')}`);
</script>