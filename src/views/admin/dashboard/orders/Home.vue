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
                    <th class="table-tr text-indigo-900">اطلاعات ارسال</th>
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
                        {{ order.user.address?.province }}
                    </td>
                    <td class="table-td">
                        <Currency :money="order.amount"/>
                    </td>
                    <td class="table-td">
                        <select @change="changeOrderstatus($event, order._id, order.status)" autofocus="true" class="w-full my-2 md:my-0 appearance-none bg-white text-indigo-900 form-input t">
                            <option value="" disabled selected>{{ orderStore.getStatus(order?.status) }}</option>
                            <option v-for="(status, index ) in orderStore.statusList" :disabled="!index" :value="index">
                                {{ status }}
                            </option>
                        </select>
                        <ChangeOrderStatus 
                            :statusValue="statusValue.toString()" 
                            :orderId="order._id" 
                            @orderIsUpdated="updateOrders(order._id)" 
                            @cancel="updateOrderStatus[order._id] = false" 
                            v-if="updateOrderStatus[order._id]"
                        />
                    </td>
                    <td class="table-td">
                        {{ new Date(order.createdAt).toLocaleDateString('fa-IR') }}
                    </td>
                    <td class="table-td">
                        <Details @click="showDetail[order._id] = true" class="w-5 h-5 text-center mx-auto text-indigo-900 cursor-pointer" />
                        <ShowOrderDetails :order="order" v-if="showDetail[order._id]" @cancel="showDetail[order._id] = false"/>
                    </td>
                    <td class="table-td">
                        <Information @click="showSendInformation[order._id] = true" class="w-5 h-5 text-center mx-auto text-indigo-900 cursor-pointer"/>
                        <SendInformation :order="order" v-if="showSendInformation[order._id]" @cancel="showSendInformation[order._id] = false"/>
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
import Information from '@/components/icons/Information.vue';
import { reactive, ref, watch } from 'vue';
import ShowOrderDetails from '@/components/dialog/ShowOrderDetails.vue';
import SendInformation from '@/components/dialog/SendInformation.vue';
import ChangeOrderStatus from '@/components/dialog/ChangeOrderStatus.vue';
import type { StringBoolean } from '@/common/typings/common.typings';
import { useRoute } from 'vue-router';
const route = useRoute();
const orderStore = useOrderStore();
const getOrders = (status: number) => {
    const orderConfig = getOrdersBystatusAxiosConfig(status);
    orderStore.getAdminOrders(orderConfig);
};
getOrders(Number(route.query?.status));
watch(
    () => route.query,
    query => {
        if (query?.status) {
            getOrders(Number(query.status));
        }
    }
);
const showDetail = reactive<StringBoolean>({});
const showSendInformation = reactive<StringBoolean>({});
const updateOrderStatus = reactive<StringBoolean>({});
const { adminOrderData } = storeToRefs(orderStore);
const statusValue = ref('');
const changeOrderstatus = (event: Event, orderId: string, status: number) => {
    const target = event.target as HTMLInputElement;
    if(status.toString() != target.value) {
        updateOrderStatus[orderId] = true;
        statusValue.value = target.value;
    }   
};
const updateOrders = (orderId: string) => {
    getOrders(Number(route.query?.status));
    updateOrderStatus[orderId] = false;
};
</script>