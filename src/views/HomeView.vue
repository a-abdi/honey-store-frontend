<template>
    <div class="px-4 py-1">
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
import ProductSort from '@/components/sort/ProductSort.vue';
const productStore = useProductStore();
const config = getProductListConfig();
productStore.getProductList(config);
const { productListData } = storeToRefs(productStore);
const showProduct = (productId: string, productName: string) => router.push(`/products/${productId}/${productName.replace(' ', '-')}`);
</script>