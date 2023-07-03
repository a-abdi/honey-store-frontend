<template>
    <div class="px-4 py-1">
      <div ref="showProducts" v-if="searchDataLazy" class="md:mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
        <ProductBox 
          v-for="product in searchDataLazy.data"
          :key="product._id"  
          :product="product"
          @click="showProduct(product._id, product.name)"
          class="cursor-pointer border border-gray-100 hover:shadow-2xl" 
        />
      </div>
      <PageLoading v-else/>
      <div v-if="searchDataLazy?.data.length == 0">
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
import { searchAxiosConfig } from '@/common/config/axios/search.config';
import { onMounted, onUnmounted, ref, watch } from 'vue';
const showProducts = ref<HTMLDivElement>();
const searchStore = useSearchStore();
const { searchDataLazy, searchData } = storeToRefs(searchStore);
const route = useRoute();
const receivedData = ref(false);
const getProductData = () => {
  const query = route.query;
  let searchQuery = `?q=${query.q}`;
  if (searchData.value?.metaData?.nextPage) {
    searchQuery = searchQuery.concat('&', `nextPage=${searchData.value.metaData.nextPage}`)
  }
  const config = searchAxiosConfig(searchQuery);
  searchStore.lazySearch(config);
};
const onScroll = () => {
  const marginBottomProduct = showProducts.value?.getBoundingClientRect().bottom || window.innerHeight;
  const innerHeight  = window.innerHeight; 
  if( 
    marginBottomProduct - innerHeight < 50 
    && !receivedData.value 
    && searchData.value?.metaData?.nextPage
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
watch(
  () => route.fullPath,
  () => {
    searchStore.reset();
    getProductData();
  }

);
searchStore.reset();
getProductData();
const showProduct = (productId: string, productName: string) => router.push(`/products/${productId}/${productName.replace(/ /g, '-')}`);
</script>