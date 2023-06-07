<template>
    <div>
      <div class="w-full md:flex md:px-0 px-4 py-2">
        <div class="md:w-5/12 w-full">
          <div class="md:mx-3 mx-1">
            <img class="mx-auto object-cover h-64 w-60" :src="productData?.data?.productImagesSrc[0]" alt="">
          </div>
          <div class="flex justify-center items-center mt-8 ">
            <div @click="showAdditionalsImage = true" class="mx-1 border border-gary-300 rounded-md p-2 cursor-pointer" v-for="additionalImage in productData?.data?.additionalsImageSrc">
              <img class="w-16 h-16 object-cover" :src="additionalImage" alt="">
            </div>
          </div>
          <ImageDialog :show-dialog="showAdditionalsImage" @cancel="closeAdditionalImage"> 
            <div class="w-full lg:flex ">
                <div class="lg:w-7/12 mt-12">
                  <img class="object-cover w-72 h-96 rounded-md mx-auto" :src="additionalsImageUrl || productData?.data?.additionalsImageSrc[0]" alt="">
                </div>
                <div class="lg:w-5/12 lg:mt-0 flex flex-wrap justify-center items-center">
                  <div class="mx-1 border border-gary-300 rounded-md p-2 cursor-pointer" v-for="additionalImage in productData?.data?.additionalsImageSrc">
                    <img @click="additionalsImageUrl = additionalImage" class="w-16 h-16 object-cover" :src="additionalImage" alt="">
                  </div>
                </div>
            </div> 
          </ImageDialog>
        </div>
        <div class="md:w-7/12 w-full text-right mt-4">
          <div class="w-full flex items-center font-bold text-indigo-900 text-lg py-2">
            {{ productData?.data?.name }}
          </div>
          <div class="w-full flex items-center font-bold text-indigo-900 text-lg py-2">
            کد محصول
            {{ productData?.data?.code }}
          </div>
          <div class="w-full md:flex">
            <div class="w-full">
              <ShowProperties v-if="productData?.data?.customProperty" :show-file="true" :custom-properties="productData?.data?.customProperty"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="productData?.data?.description" class="text-gray-600 px-8 pt-8 pb-12 border-t-2 border-gray-200 sm:text-sm text-xs">
        <p class="underline underline-offset-8 decoration-violet-600 decoration-2 mb-4 text-bold text-base text-gray-900">
          معرفی
        </p>
        <p class="tracking-wide leading-loose text-indigo-900">
          {{ productData?.data?.description }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { useProductStore } from '@/stores/product';
  import { getProductConfig, getCommentListAxiosConfig } from '@/common/config/axiox.config';
  import { storeToRefs } from 'pinia';
  import { ref } from 'vue';
  import ImageDialog from '@/components/dialog/ImageDialog.vue';
  import ShowProperties from '@/components/ShowProperties.vue';
  import { useCommentStore } from '@/stores/comment';
    const route = useRoute();
    const productId = route.params.productId as string;
    const productStore = useProductStore();
    const config = getProductConfig(productId);
    const commenStore = useCommentStore();
    const getCommentListConfig = getCommentListAxiosConfig(productId);
    commenStore.getCommentList(getCommentListConfig);
    productStore.getProduct(config);
    const { productData } = storeToRefs(productStore);
    const additionalsImageUrl = ref(productData.value?.data?.additionalsImageSrc[0]);
    const showAdditionalsImage = ref(false);
    const closeAdditionalImage = () => {
      showAdditionalsImage.value = false;
      additionalsImageUrl.value = undefined; 
    };
  </script>