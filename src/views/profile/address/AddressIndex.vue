<template>
    <div class="md:h-80 h-screen w-full p-4 border border-gray-200 rounded-md">
        <div class="mb-4 lg:text-lg md:text-base text-sm text-gray-900">
            آدرس
        </div>
        <div class="tracking-wide md:text-sm text-xs leading-loose text-indigo-900">
            {{ userData?.data?.address?.postalAddress }}
        </div>
        <div class="text-indigo-700 text-xs">
            <div v-if="userData?.data?.address?.province" class="my-4 flex items-center">
                <div>
                    <HomeIcone class="w-5 h-5 ml-2" />
                </div>
                <div>
                    {{ userData?.data?.address?.province }}
                </div>
            </div>
            <div v-if="userData?.data?.address?.postalCode" class="my-4 flex items-center">
                <div>
                    <MailIcone class="w-5 h-5 ml-2" />
                </div>
                <div>
                    {{ userData?.data?.address?.postalCode }}
                </div>
            </div>
            <div v-if="userData?.data?.address?.recipient.phoneNumber" class="my-4 flex items-center">
                <div>
                    <PhoneIcone class="w-5 h-5 ml-2" />
                </div>
                <div>
                    {{ userData?.data?.address?.recipient.phoneNumber }}
                </div>
            </div>
            <div v-if="userData?.data?.address?.recipient.firstName || userData?.data?.address?.recipient.lastName"
                class="my-4 flex items-center">
                <div>
                    <UserProfileIcone class="w-5 h-5 ml-2" />
                </div>
                <div>
                    {{ userData?.data?.address?.recipient.firstName }} {{ userData?.data?.address?.recipient.lastName }}
                </div>
            </div>
            <div class="flex flex-row-reverse text-sm">
                <UserAddress :show-dialog="showUserAddress" @cancel="showUserAddress = false" @success="showUserAddress = false"/>
                <button @click="showUserAddress = true" v-if="userData?.data?.address" class="btn-violet">ویرایش آدرس</button>
                <button @click="showUserAddress =true" v-else="userData?.data?.address" class="btn-violet">ثبت آدرس</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import HomeIcone from '@/components/icons/Home.vue'
import PhoneIcone from '@/components/icons/UserAddressPhone.vue';
import UserProfileIcone from '@/components/icons/UserProfile.vue';
import MailIcone from '@/components/icons/Mail.vue';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import UserAddress from '@/components/UserAddress.vue';
import { ref } from 'vue';
const showUserAddress = ref(false);
const userStore = useUserStore();
const { userData } = storeToRefs(userStore);
</script>