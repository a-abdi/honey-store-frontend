<template>
    <div class="">
        <Dialog :showDialog="showDialog" @yes="deleteProperty"  @cancel=" showDialog = false">
            <div class="text-right my-4 text-indigo-900">
               <p>خصوصیات مورد نظر حذف شود؟</p>
            </div>
        </Dialog>
        <Message class="absolute bottom-4 right-4 bg-gray-300" 
            :message="page.message"
            :showMessage="page.showMessage"
            :typeMessage="page.typeMessage"
            @fadeMessage="page.showMessage = false" 
        />
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr">برچسب</th>
                    <th class="table-tr">نوع</th>
                    <th class="table-tr">ویرایش</th>
                    <th class="table-tr">حذف</th>
                </tr>
            </thead>
            <tbody v-if="propertyListData?.data?.length">
                <tr v-for="( property, index ) in propertyListData.data" :key="property._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td @click="showProperty[property._id] = true" class="table-td cursor-pointer">
                        {{ property.label }} 
                        <PropertyDetails v-if="showProperty[property._id]" @close="showProperty[property._id] = false" :propertyId="property._id" :showProperty="showProperty[property._id]"/>
                    </td>
                    <td class="table-td"> {{ property.type }} </td>
                    <td class="table-td">  
                        <router-link :to="`/admin/dashboard/properties/${property._id}/edit`">
                            <EditElement/>
                        </router-link> 
                    </td>
                    <td class="table-td"> 
                        <DeleteElement @delete="showDialog = true, propertyId = property._id"/> 
                    </td>
                </tr>
            </tbody>
        </table>
        <PageLoading v-if="!propertyListData"/>
    </div>
</template>

<script setup lang="ts">
import { getPropertyListConfig, deletePropertyConfig } from '@/common/config/axios/admin/property.config';
import { storeToRefs } from 'pinia';
import { usePropertyStore } from '@/stores/property';
import { reactive, ref } from 'vue';
import { TypeMessage, type Page, type StringBoolean } from '@/common/typings/common.typings';
import axios from 'axios';
import EditElement from '@/components/element/EditElement.vue';
import Message from '@/components/message/Message.vue';
import DeleteElement from '@/components/element/DeleteElement.vue';
import Dialog from '@/components/dialog/Dialog.vue';
import PropertyDetails from '@/components/dialog/PropertyDetails.vue';
import PageLoading from '@/components/loading/PageLoading.vue';
import { ErrorHander } from '@/helper/handel-error.helper';

const properyStore = usePropertyStore();
const showDialog = ref(false);
const showProperty = reactive<StringBoolean>({});
const propertyId = ref('');
const page = reactive<Page>({});
const { propertyListData } = storeToRefs(properyStore);
const { propertyData } = storeToRefs(properyStore);
const propertyConfig = getPropertyListConfig();
properyStore.getPropertyList(propertyConfig);
const deleteProperty = async () => {
    try {
        const config = deletePropertyConfig(propertyId.value);
        showDialog.value = false;
        await properyStore.deleteProperty(config);
        page.showMessage = true;
        page.typeMessage = TypeMessage.Success;
        page.message = propertyData.value?.message;
        properyStore.getPropertyList(propertyConfig);
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            const errorHander = ErrorHander.getInstance();
            page.message = errorHander.getMessage(error);
        } else {
            console.log(error);
        }
    }
}
</script>