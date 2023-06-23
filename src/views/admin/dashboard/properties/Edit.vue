<template>
    <form>
        <div v-if="propertyData" class="px-1 sm:px-4 sm:pb-36 mt-6 mx-auto w-11/12 border border-gray-200 rounded-md">
            <div class="sm:flex sm:mt-6 sm:mb-12">
                <div class="w-full sm:my-4 px-2 my-8">
                    <input v-model="property.label" id="name" type="text" :placeholder="propertyData?.data?.label" class="form-input">
                </div>
                <div class="w-full sm:my-4 px-2 my-8">
                    <select v-model="property.type" name="type" autofocus="true" id="type" aria-placeholder="select type" class="w-full py-2 bg-white text-gray-600 form-input text-right">
                        <option value="" disabled selected>{{ propertyData?.data?.type }}</option>
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
                        ویرایش خصوصیت
                    </div>
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
import { onMounted, reactive, ref } from 'vue';
import Message from '@/components/message/Message.vue';
import { updatePropertyAxiosConfig, getProperyAxiosConfig } from '@/common/config/axiox.config'
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import { TypeMessage, type Page } from '@/common/typings/common.typings';
import type { newProperty } from '@/common/typings/property.typing';
import { usePropertyStore } from '@/stores/property';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import PageLoading from '@/components/loading/PageLoading.vue';

    const route = useRoute();
    const propertyId = route.params.propertyId as string;
    const propertyStore = usePropertyStore();
    
    const typeList = [
        "input",
        "image",
    ];
    const { propertyData } = storeToRefs(propertyStore);
    const unitInput = ref('');
    const checkbox = reactive<any>({});
    const page = reactive<Page>({
        loading: false,
        message: '',
        typeMessage: TypeMessage.Success,
        showMessage: false
    });
    const property = reactive<Partial<newProperty>>({});

    onMounted(async ()=> {
        const getPropertyConfig = getProperyAxiosConfig(propertyId);
        await propertyStore.getProperty(getPropertyConfig);
        if (propertyData.value?.data?.unit.length) {
            property.unit = propertyData.value?.data?.unit;
            for (const unit of property.unit) {
                checkbox[unit] = true;
            }
        }
    })
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
    const createProperty = async () => {
        page.loading = true;
        page.errorMessage = null;
        page.successMessage = null;
        try {
            const config = updatePropertyAxiosConfig(propertyId, property);
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
        page.loading = false;
    };

</script>