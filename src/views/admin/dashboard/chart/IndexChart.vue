<template>
    <div class="bg-gray-100">
        <div v-if="orderStatus && orderCanceledDates && orderDeliveredDates && orderPaymentDates && orderWatingPayDates && orderSendDate && orderReturnDate"
            class="py-12 h-11/12 grid grid-cols-3 gap-4 mx-4">
            <OrderDateLine class="md:col-span-2 col-span-3 bg-white rounded-lg border border-gray-200"/>
            <OrderDateDoughnut class="md:col-span-1 col-span-3 bg-white rounded-lg border border-gray-200"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getOrderDateReport, getOrderStatusReport } from '@/common/config/axios/admin/chart.config';
import { useChartStore } from '@/stores/chart';
import { onMounted } from 'vue';
import { OrderStatus } from '@/common/typings/common.typings';
import OrderDateLine from './OrderDateLine.vue';
import OrderDateDoughnut from './OrderDateDoughnut.vue';
import { storeToRefs } from 'pinia';

const useChart = useChartStore();
const { orderCanceledDates, } = storeToRefs(useChart);
const { orderDeliveredDates } = storeToRefs(useChart);
const { orderPaymentDates } = storeToRefs(useChart);
const { orderWatingPayDates } = storeToRefs(useChart);
const { orderSendDate } = storeToRefs(useChart);
const { orderReturnDate } = storeToRefs(useChart);
const { orderStatus } = storeToRefs(useChart);
onMounted(async () => {
    const orderDeliveredDatesConfig = getOrderDateReport();
    const orderWatingPayDatesConfig = getOrderDateReport(`status=${OrderStatus.WatingPay}`);
    const orderCanceledDatesConfig = getOrderDateReport(`status=${OrderStatus.Cancel}`);
    const orderPaymentDatesConfig = getOrderDateReport(`status=${OrderStatus.Payment}`);
    const orderSendDateDatesConfig = getOrderDateReport(`status=${OrderStatus.Send}`);
    const orderReturnDateDatesConfig = getOrderDateReport(`status=${OrderStatus.Return}`);
    const getOrderStatusReportConfig = getOrderStatusReport();
    await Promise.all([
        useChart.getOrderDeliveredDate(orderDeliveredDatesConfig),
        useChart.getOrderCanceledDate(orderCanceledDatesConfig),
        useChart.getOrderWatingDate(orderWatingPayDatesConfig),
        useChart.getOrderPaymentDate(orderPaymentDatesConfig),
        useChart.getOrderSendDate(orderSendDateDatesConfig),
        useChart.getOrderReturnedDate(orderReturnDateDatesConfig),
        useChart.getOrderStatus(getOrderStatusReportConfig),
    ]);
});
</script>
