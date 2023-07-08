<template>
    <form>
        <div class="px-1 sm:space-y-8 space-y-6 py-8 sm:mb-8 mt-6 mx-auto 2xl:w-4/12 xl:w-5/12 lg:w-6/12 md:w-8/12 sm:w-full border border-gray-200 rounded-md">
            <div class="w-full px-2">
                <input v-model="property.label" id="name" type="text" placeholder="برچسب" class="form-input">
            </div>
            <div class="w-full px-2">
                <select v-model="property.type" name="type" autofocus="true" id="type" aria-placeholder="select type" class="w-full bg-white text-gray-600 form-input py-1">
                    <option value="" disabled selected>نوع</option>
                    <option v-for="types in PROPERTY_TYPES" :value="types">{{ types }}</option>
                </select>                
            </div>
            <div class="w-full px-2">
                <input @keyup.enter="enterUnit" v-model="unitInput" id="unit" type="text" placeholder="واحد" class="form-input">
                <div class="flex">
                    <label class="flex items-center m-1" v-for="unit of property.unit" >
                        <input v-model="checkbox[unit]" @change="changeUnit(unit, checkbox[unit])" :id="unit" class="mx-0.5 accent-violet-600" v-if="unit" type="checkbox">
                        {{ unit }}
                    </label>
                </div>
            </div>
            <div class="w-full px-2">
                <textarea placeholder="توضیخات" class="p-2 text-gray-600 resize-none border rounded-md w-full h-16 sm:h-24 md:h-32 focus:outline-none focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
            <div class="w-full flex flex-row-reverse pl-2">
                <div @click="createProperty" :class="{'cursor-wait': page.sending, 'cursor-pointer': !page.sending}" class="flex items-center justify-center w-36 h-8 btn-violet">
                    ایجاد خصوصیت
                </div>
            </div> 
            <Message class="absolute bottom-4 right-4 bg-gray-300" 
                :message="page.message"
                :showMessage="page.showMessage"
                :typeMessage="page.typeMessage"
                @fadeMessage="page.showMessage = false" 
            />
        </div>
    </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Message from '@/components/message/Message.vue';
import { createPropertyAxiosConfig } from '@/common/config/axios/admin/property.config'
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { newProperty } from '@/common/typings/property.typing';
import { usePropertyStore } from '@/stores/property';
import { storeToRefs } from 'pinia';
import { PROPERTY_TYPES } from '@/common/constans';

const propertyStore = usePropertyStore();
const unitInput = ref('');
const checkbox = reactive<any>({});
const page = reactive<Page>({
    sending: false,
    message: '',
    showMessage: false,
    typeMessage: TypeMessage.Success
});
const property = reactive<newProperty>({
    label: "",
    unit: [],
    type: "",
});
const formSubmit = ref(true);
const enterUnit = () => {
    formSubmit.value = false;
    if (unitInput.value && property.unit.every(el => el != unitInput.value)) {
        property.unit.push(unitInput.value);
    }
    checkbox[unitInput.value] = true;
    unitInput.value = '';
};

const changeUnit = (unit: string, checkboxUnit: any) => {
    if (checkboxUnit) {
        property.unit.push(unit);
    } else {
        property.unit.splice(property.unit.indexOf(unit), 1);
    }
}
const createProperty = async () => {
    try {
        const config = createPropertyAxiosConfig(property);
        page.sending = true;
        await propertyStore.createProperty(config);
        page.showMessage = true;
        const { propertyData } = storeToRefs(propertyStore);
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
    property.category = [];
    property.label = "";
    property.type = "";
    property.unit = [];
    page.loading = false;
};
</script>