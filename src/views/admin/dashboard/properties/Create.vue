<template>
    <form>
        <div class="px-1 sm:px-4 sm:pb-36 mt-6 mx-auto w-11/12 border border-gray-200 rounded-md">
            <div class="sm:flex sm:mt-6 sm:mb-12">
                <div class="w-full sm:my-4 px-2 my-8">
                    <input v-model="property.label" id="name" type="text" placeholder="برچسب" class="form-input">
                </div>
                <div class="w-full sm:my-4 px-2 my-8">
                    <select v-model="property.type" name="type" autofocus="true" id="type" aria-placeholder="select type" class="w-full bg-white text-gray-600 form-input text-right">
                        <option value="" disabled selected>نوع</option>
                        <option v-for="types in typeList" :value="types">{{ types }}</option>
                    </select>                
                </div>
            </div>
            <div class="sm:flex">
                <div class="w-full sm:my-4 px-2 my-8">
                    <input @keyup.enter="enterUnit" v-model="unitInput" id="unit" type="text" placeholder="واحد" class="form-input">
                    <div class="flex">
                        <label class="flex items-center m-1 " v-for="unit of property.unit" >
                            <input v-model="checkbox[unit]" @change="changeUnit(unit, checkbox[unit])" :id="unit" class="mx-0.5 accent-violet-600" v-if="unit" type="checkbox">
                            {{ unit }}
                        </label>
                    </div>
                </div>
                <div class="w-full sm:my-4 my-8">
                    <div @click="createProperty" class="text-center cursor-pointer w-full h-8 btn-violet">
                        ایجاد خصوصیت
                    </div>
                </div> 
            </div>
            <Message class="absolute bottom-4 right-4 bg-gray-300" 
                :message="page.message"
                :showMessage="showMessage"
                :typeMessage="page.typeMessage"
                @fadeMessage="showMessage = false" 
            />
        </div>
    </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import Message from '@/components/message/Message.vue';
import { createPropertyAxiosConfig } from '@/common/config/axiox.config'
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { newProperty } from '@/common/typings/property.typing';
import { usePropertyStore } from '@/stores/property';
import { storeToRefs } from 'pinia';

    const typeList = [
        "file",
        "text",
        "number",
    ];
    const propertyStore = usePropertyStore();
    const unitInput = ref('');
    const checkbox = reactive<any>({});
    const page = reactive<Page>({
        loading: false,
        message: '',
        typeMessage: TypeMessage.Success
    });
    const showMessage = ref(false);
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
        page.loading = true;
        page.errorMessage = null;
        page.successMessage = null;
        try {
            const config = createPropertyAxiosConfig(property);
            await propertyStore.createProperty(config);
            showMessage.value = true;
            const { propertyData } = storeToRefs(propertyStore);
            page.typeMessage = TypeMessage.Success;
            page.message = propertyData.value?.message;
        } catch (error: any) {
            page.typeMessage = TypeMessage.Danger;
            if (axios.isAxiosError(error)) {
            page.message = getAxiosErrorMessage(error);
            } else {
                console.log(error);
            }
        }
        property.category = [];
        property.label = "";
        property.type = "";
        property.unit = [];
        page.loading = false;
    };

</script>