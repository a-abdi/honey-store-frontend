<template>
    <div class="">
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr text-indigo-900">نام</th>
                    <th class="table-tr text-indigo-900">توضیحات</th>
                    <th class="table-tr text-indigo-900">ویرایش</th>
                </tr>
            </thead>
            <tbody  v-if="categoryListData?.data?.length">
                <tr v-for="( category, index ) in categoryListData.data" :key="category._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td"> 
                        <p class="font-bold text-indigo-900">
                            {{ category.name }} 
                        </p>
                    </td>
                    <td class="table-td">
                        <p class="px-4 tracking-wide leading-loose text-indigo-900"> 
                            {{ category.description }} 
                        </p>
                    </td>
                    <td class="table-td">  
                        <router-link :to="`/admin/dashboard/categories/${category._id}/edit`">
                            <EditElement/>
                        </router-link> 
                    </td>
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
    import EditElement from '@/components/element/EditElement.vue';

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