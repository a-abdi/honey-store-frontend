<template>
    <div v-if="product">
        <ProductForm 
        :defaultFormData="product.data"
        :productCategory="product.data.category[0].name"
        :storeSendProduct="'adminProducts/editProduct'">
            Edit Product
        </ProductForm>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import ProductForm from '@/components/AdminProductForm.vue';

        const route = useRoute()
        const productId = route.params.productId
       
</script>