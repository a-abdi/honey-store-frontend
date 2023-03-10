<template>
    <div class="">
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr">ویرایش</th>
                    <th class="table-tr">توضیحات</th>
                    <th class="table-tr">نام</th>
                </tr>
            </thead>
            <tbody v-if="categoryListData?.data?.length >= 0">
                <tr v-for="( category, index ) in categoryListData.data" :key="category._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td">  <router-link :to="`/admin/dashboard/categories/${category._id}/edit`" class="btn-yellow"> ویرایش </router-link> </td>
                    <td class="table-td"> {{ category.description }} </td>
                    <td class="table-td"> {{ category.name }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useCategoryStore } from '@/stores/category';
    import { getCategoryListConfig } from '@/common/config/axiox.config';
    import { storeToRefs } from 'pinia';

    const categoryStore = useCategoryStore();
    const config = getCategoryListConfig();
    
    try {
        onMounted(async () => {
            await categoryStore.getCategoryList(config);
        });
    } catch (error) {
        console.log(error);
    }
    const { categoryListData } = storeToRefs(categoryStore);
    
    const showDetails = ref(false);
</script>