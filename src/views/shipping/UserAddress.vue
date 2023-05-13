<template>
    <div class=" w-full">
        <div class="form-design sm:my-6 lg:w-1/2 md:w-3/4 w-full bg-slate-100">
            <div class="sm:rounded-md text-center py-2 bg-violet-600">
                <div class="text-white">
                    انتخاب آدرس
                </div>
            </div>
           <form @submit.prevent="">
                <div class="sm:mx-6 my-6 px-4 sm:px-0 text-gray-600">
                    <div class="sm:mb-3 mb-1 text-violet-600">
                        آدرس پستی
                    </div>
                    <div class="w-full">
                        <textarea v-model="newAddress.postalAddress" class="p-2 text-gray-600 resize-y border rounded-md w-full h-8 sm:h-12 md:h-16 xl:h-20 focus:outline-none focus:ring-200"></textarea>
                    </div>
                </div>
                <div class="sm:flex items-center justify-between sm:my-6">
                    <div class="w-full sm:mx-6 sm:my-0 my-6 px-4 sm:px-0 text-gray-600">
                        <div class="sm:mb-3 mb-1 text-violet-600">
                            استان
                        </div>
                        <div class="w-full">
                            <select v-model="newAddress.province" @change="updateCity" name="province" autofocus="true" id="province" aria-placeholder="select province" class="w-full py-2 bg-white text-gray-600 form-input text-right">
                                <option v-for="province in provinces" :key="province.id" :value="province.name">{{ province.name }}</option>
                            </select>                        
                        </div>
                    </div>
                    <div class="w-full sm:mx-6 sm:my-0 my-6 px-4 sm:px-0 text-gray-600">
                        <div class="sm:mb-3 mb-1 text-violet-600">
                            شهر
                        </div>
                        <div class="w-full">
                            <select v-model="newAddress.city" name="city" autofocus="true" id="city" aria-placeholder="select city" class="w-full py-2 bg-white text-gray-600 form-input text-right">
                                <option v-for="city in citiesProvince" :key="city.id" :value="city.name">{{ city.name }}</option>
                            </select>   
                        </div>
                    </div>
                </div>
                <div class="sm:flex items-center justify-between sm:my-6">
                    <div class="w-full sm:mx-6 sm:my-0 my-6 px-4 sm:px-0 text-gray-600">
                        <div class="sm:mb-3 mb-1 text-violet-600">
                            پلاک
                        </div>
                        <div class="w-full">
                            <input v-model="newAddress.plaque" name="plaque" id="plaque" class="form-input">
                        </div>
                    </div>
                    <div class="w-full sm:mx-6 sm:my-0 my-6 px-4 sm:px-0 text-gray-600">
                        <div class="sm:mb-3 mb-1 text-violet-600">
                            کد پستی
                        </div>
                        <div class="w-full">
                            <input v-model="newAddress.postalCode" name="postalCode" id="postalCode" class="form-input">
                        </div>
                    </div>
                </div>
                <div class="sm:flex items-center justify-between sm:my-6">
                    <div class="w-full sm:mx-6 sm:my-0 my-6 px-4 sm:px-0 text-gray-600">
                        <div class="sm:mb-3 mb-1 text-violet-600">
                            نام گیرنده
                        </div>
                        <div class="w-full">
                            <input v-model="newAddress.recipient.firstName" name="recipientFirstName" id="recipientFirstName" class="form-input">
                        </div>
                    </div>
                    <div class="w-full sm:mx-6 sm:my-0 my-6 px-4 sm:px-0 text-gray-600">
                        <div class="sm:mb-3 mb-1 text-violet-600">
                            نام خانوادگی گیرنده
                        </div>
                        <div class="w-full">
                            <input v-model="newAddress.recipient.lastName" name="recipientLastName" id="recipientLastName" class="form-input">
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-between sm:my-6">
                    <div class="w-full sm:mx-6 px-4 sm:px-0 text-gray-600">
                        <div class="sm:mb-3 mb-1 text-violet-600">
                            تلفن گیرنده
                        </div>
                        <div class="w-full">
                            <input v-model="newAddress.recipient.phoneNumber" name="recipientPhoneNumber" id="recipientPhoneNumber" class="form-input">
                        </div>
                    </div>
                </div>
                <div class="sm:mx-6 my-6 sm:px-0 px-4">
                    <button @click="updateAddress" class="btn-violet w-full p-2">
                        ثبت آدرس
                    </button>
                </div>
            </form>
            <Message class="absolute bottom-0 right-0 bg-gray-300" 
                :message="page.message"
                :showMessage="page.showMessage"
                :typeMessage="page.typeMessage"
                @fadeMessage="page.showMessage = false" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { reactive, ref, watch, type Ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { TypeMessage, type Page, type City} from '@/common/typings/common.typings';
import axios from 'axios';
import { getAxiosErrorMessage } from '@/common/helpers';
import Message from '@/components/message/Message.vue';
import { getUserConfig, updateUserAddressConfig } from '@/common/config/axiox.config';
import provinces from '@/assets/address/provinces.json';
import cities from '@/assets/address/cities.json';
import type { UserAddress } from '@/common/typings/user.typing';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const citiesProvince = ref([]) as Ref<City[]>;
const config = getUserConfig();
userStore.getOneUser(config);
const { userData } = storeToRefs(userStore);
const newAddress = reactive<UserAddress>({
    province: '',
    city: '',
    plaque: '',
    postalAddress: '',
    postalCode: '',
    selected: true,
    recipient: {
        lastName: '',
        firstName: '',
        phoneNumber: '',
    }
});

const updateCity = () => {
    citiesProvince.value = [];
    const province = provinces.find(province => province.name == newAddress.province);
    citiesProvince.value = cities.filter(city => city.province_id == province?.id);
};

watch( 
    () => userData.value?.data?.address,
    address => {
        if (address) {
            newAddress.province = address[0].province;
            updateCity();
            newAddress.city = address[0].city;
            newAddress.plaque = address[0].plaque;
            newAddress.postalAddress = address[0].postalAddress;
            newAddress.postalCode = address[0].postalCode;
            newAddress.selected = true;
            newAddress.recipient.firstName = address[0].recipient.firstName;
            newAddress.recipient.lastName = address[0].recipient.lastName;
            newAddress.recipient.phoneNumber = address[0].recipient.phoneNumber;
        }
    }
)

const page = reactive<Page>({
    message: '',
    typeMessage: TypeMessage.Success,
    showMessage: false,
});

const updateAddress = async () => {
    try {
        const config = updateUserAddressConfig({address: newAddress});
        await userStore.update(config);
        router.push('/payment');
    } catch (error) {
        page.showMessage = true;
        page.typeMessage = TypeMessage.Danger;
        if (axios.isAxiosError(error)) {
            page.message = getAxiosErrorMessage(error)
                .replace('address.', '')
                .replace('recipient.', '');
            page.message.replace('address', '');
        } else {
            console.log(error);
        }
    }
};
</script>