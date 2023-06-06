<template>
    <div class="">
        <table class="table-auto w-full tracking-wider">
            <thead>
                <tr class="">
                    <th class="table-tr text-indigo-900">نام</th>
                    <th class="table-tr text-indigo-900">شماره تماس</th>
                    <th class="table-tr text-indigo-900">استان</th>
                    <th class="table-tr text-indigo-900">مبلغ</th>
                    <th class="table-tr text-indigo-900">وضعیت</th>
                    <th class="table-tr text-indigo-900">تاریخ</th>
                    <th class="table-tr text-indigo-900">جزئیات</th>
                </tr>
            </thead>
            <tbody  v-if="adminOrderData?.data?.length">
                <tr v-for="( order, index ) in adminOrderData.data" :key="order._id" :class="{'bg-neutral-100': (index + 1) % 2 }">
                    <td class="table-td"> 
                       {{ order.user.firstName }} {{ order.user.lastName }}
                    </td>
                    <td class="table-td">
                        {{ convertToPersian(order.user.phoneNumber.replace('+98', '0')) }}
                    </td>
                    <td class="table-td">
                        {{ order.user.address.province }}
                    </td>
                    <td class="table-td">
                        <Currency :money="order.amount"/>
                    </td>
                    <td class="table-td">
                        {{ orderStore.getStatus(order?.status) }}
                    </td>
                    <td class="table-td">
                        {{ new Date(order.createdAt).toLocaleDateString('fa-IR') }}
                    </td>
                    <td class="">
                        <Details class="w-5 h-5 text-center mx-auto text-indigo-900 cursor-pointer" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { getOrdersBystatusAxiosConfig } from '@/common/config/axiox.config';
import { storeToRefs } from 'pinia';
import { useOrderStore } from '@/stores/order';
import Currency from '@/components/Currency.vue';
import { convertToPersian } from '@/common/helpers';
import Details from '@/components/icons/Details.vue';
const status = 1;
const orderConfig = getOrdersBystatusAxiosConfig(status);
const orderStore = useOrderStore();
orderStore.getAdminOrders(orderConfig);
const { adminOrderData } = storeToRefs(orderStore);
</script>