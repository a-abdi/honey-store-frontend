<template>
    <div>
        <table class="table-auto w-full tracking-wider min-w-lg">
            <thead>
                <tr class="">
                    <th class="table-tr text-indigo-900"> نام </th>
                    <th class="table-tr text-indigo-900"> نام خانوادگی </th>
                    <th class="table-tr text-indigo-900"> شماره تماس </th>
                    <th class="table-tr text-indigo-900"> تاریخ عضویت </th>
                </tr>
            </thead>
            <tbody v-if="userDataList?.data.length">
                <tr v-for="( user, index ) in userDataList.data" :key="user._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td"> 
                        {{ user.firstName }}
                    </td>
                    <td class="table-td"> 
                        {{ user.lastName }}
                    </td>
                    <td class="table-td"> 
                        {{ user.phoneNumber.replace('+98', '0') }}
                    </td>
                    <td class="table-td"> 
                        {{ new Date(user.createdAt).toLocaleDateString('fa-IR').replace(/\//g, '-') }}
                    </td>
                </tr>
            </tbody>
        </table>
        <PageLoading v-if="!userDataList?.data"/>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import PageLoading from '@/components/loading/PageLoading.vue';
import { useUserStore } from '@/stores/user';
import { getUserListConfig } from '@/common/config/axios/admin/user.config';

const userStore = useUserStore();
const { userDataList } = storeToRefs(userStore);
const config = getUserListConfig();
userStore.getUserList(config);
</script>