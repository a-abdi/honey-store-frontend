<template>
    <div class="">
        <ConfirmDelete :showDialog="showDialog" @yes="deleteProperty"  @cancel=" showDialog = false">
            <div class="text-right my-4 text-purple-600">
               <p>خصوصیات مورد نظر حذف شود؟</p>
            </div>
        </ConfirmDelete>
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
                    <th class="table-tr">واحد</th>
                    <th class="table-tr">ویرایش</th>
                    <th class="table-tr">حذف</th>
                </tr>
            </thead>
            <tbody v-if="propertyListData?.data?.length">
                <tr v-for="( property, index ) in propertyListData.data" :key="property._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td"> {{ property.label }} </td>
                    <td class="table-td"> {{ property.type }} </td>
                    <td class="table-td"> 
                        <div v-if="property.unit?.length">
                            <div class="" v-for="unit of property.unit">
                                {{ unit }}
                            </div>
                        </div>
                    </td>
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
    </div>
</template>

<script setup lang="ts">
import { getProperyListConfig, deletePropertyConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { usePropertyStore } from '@/stores/property';
import { reactive, ref } from 'vue';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import EditElement from '@/components/element/EditElement.vue';
import Message from '@/components/message/Message.vue';
import DeleteElement from '@/components/element/DeleteElement.vue';
import ConfirmDelete from '@/components/dialog/ConfirmDelete.vue';
const properyStore = usePropertyStore();
const showDialog = ref(false);
const propertyId = ref('');
const page = reactive<Page>({});
const { propertyListData } = storeToRefs(properyStore);
const { propertyData } = storeToRefs(properyStore);
const propertyConfig = getProperyListConfig();
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
            page.message = getAxiosErrorMessage(error);
        } else {
            console.log(error);
        }
    }
}
</script>