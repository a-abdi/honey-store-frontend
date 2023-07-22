<template>
    <form>
        <div v-if="propertyData" class="px-1 sm:space-y-8 space-y-6 py-8 sm:mb-8 mt-6 mx-auto 2xl:w-4/12 xl:w-5/12 lg:w-6/12 md:w-8/12 sm:w-full border border-gray-200 rounded-md">
            <div class="w-full px-2">
                <input v-model="property.label" id="name" type="text" :placeholder="propertyData?.data?.label" class="form-input">
            </div>
            <div class="w-full px-2">
                <select v-model="property.type" name="type" autofocus="true" id="type" aria-placeholder="select type" class="w-full bg-white text-gray-600 form-input py-1">
                    <option value="" disabled selected>{{ propertyData?.data?.type }}</option>
                    <option v-for="types in PROPERTY_TYPES" :value="types">{{ types }}</option>
                </select>                
            </div>
            <div class="w-full px-2">
                <input @keyup.enter="enterUnit" v-model="unitInput" id="unit" type="text" placeholder="واحد" class="form-input">
                <div class="flex">
                    <label class="flex items-center m-1 " v-for="unit of property.unit" >
                        <input v-model="checkbox[unit]" @change="changeUnit(unit, checkbox[unit])" :id="unit" class="mx-0.5 accent-violet-600" v-if="unit" type="checkbox">
                        {{ unit }}
                    </label>
                </div>
            </div>
            <div class="w-full px-2">
                <textarea v-model="property.description" class="p-2 text-gray-600 resize-none border rounded-md w-full h-16 sm:h-24 md:h-32 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
            <div class="w-full flex flex-row-reverse pl-2">
                <div @click="editProperty" :class="{'cursor-wait': page.sending, 'cursor-pointer': !page.sending}" class="flex items-center justify-center w-46 h-8 btn-violet">
                    ویرایش خصوصیت
                </div>
            </div>
            <Message class="absolute bottom-4 right-4 bg-gray-300" 
                :message="page.message"
                :showMessage="page.showMessage"
                :typeMessage="page.typeMessage"
                @fadeMessage="page.showMessage = false" 
            />
        </div>
        <PageLoading v-else/>
    </form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import Message from '@/components/message/Message.vue';
import { updatePropertyAxiosConfig, getPropertyAxiosConfig } from '@/common/config/axios/admin/property.config'
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { newProperty } from '@/common/typings/property.typing';
import { usePropertyStore } from '@/stores/property';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import PageLoading from '@/components/loading/PageLoading.vue';
import { PROPERTY_TYPES } from '@/common/constans';

const route = useRoute();
const propertyId = route.params.propertyId as string;
const propertyStore = usePropertyStore();
const { propertyData } = storeToRefs(propertyStore);
const unitInput = ref('');
const checkbox = reactive<any>({});
const page = reactive<Page>({
    sending: false,
    message: '',
    typeMessage: TypeMessage.Success,
    showMessage: false
});
const property = reactive<Partial<newProperty>>({});
watch(
    () => propertyData.value?.data,
    propertyData => {
        property.label = propertyData?.label;
        property.description = propertyData?.description;
        property.type = propertyData?.type;
        property.unit = propertyData?.unit;
    }
);
onMounted(async ()=> {
    const getPropertyConfig = getPropertyAxiosConfig(propertyId);
    await propertyStore.getProperty(getPropertyConfig);
    if (propertyData.value?.data?.unit.length) {
        property.unit = propertyData.value?.data?.unit;
        for (const unit of property.unit) {
            checkbox[unit] = true;
        }
    }
});
const formSubmit = ref(true);
const enterUnit = () => {
    formSubmit.value = false;
    !property?.unit && ( property.unit = [] ) 
    if (unitInput.value && property?.unit?.every(el => el != unitInput.value)) {
        property.unit.push(unitInput.value);
    }
    checkbox[unitInput.value] = true;
    unitInput.value = '';
};

const changeUnit = (unit: string, checkboxUnit: any) => {
    if (checkboxUnit) {
        property?.unit?.push(unit);
    } else {
        property?.unit?.splice(property.unit.indexOf(unit), 1);
    }
}
const editProperty = async () => {
    try {
        const config = updatePropertyAxiosConfig(propertyId, property);
        page.sending = true;
        await propertyStore.createProperty(config);
        page.showMessage = true;
        page.typeMessage = TypeMessage.Success;
        page.message = propertyData.value?.message;
    } catch (error: any) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
        page.message = getAxiosErrorMessage(error);
        } else {
            console.log(error);
        }
    }
    page.sending = false;
};
</script>