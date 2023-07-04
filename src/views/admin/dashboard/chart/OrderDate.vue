<template>
    <div class="w-1/2">
        <canvas id="myChart" width="400" height="200"></canvas>
    </div>
</template>

<script lang="ts" setup>
import { getOrderDateReport } from '@/common/config/axios/admin/chart.config';
import { useChartStore } from '@/stores/chart';
import type { ChartConfiguration, ChartData } from 'chart.js';
import Chart from 'chart.js/auto';
import { storeToRefs } from 'pinia';
import { onMounted, type Ref } from 'vue';
import { OrderStatus } from '@/common/typings/common.typings';
import type { ReportOrderDateData } from '@/common/typings/chart.typings';

const getDataAndLabel = (orderDate: Ref<ReportOrderDateData | null>) => {
    let data = [] as number[];
    for (let index = 1; index < 31; index++) {
        const order = orderDate?.value?.data.find(order => order._id.day == index);
        if (order?.count) {
            data.push(order.count);
        } else {
            data.push(0);
        }
    }
    return data;
};

const useChart = useChartStore();
onMounted(async () => {
    const { orderDeliveredDates } = storeToRefs(useChart);
    const { orderCanceledDates } = storeToRefs(useChart);
    const { orderPaymentDates } = storeToRefs(useChart);
    const { orderWatingPayDates } = storeToRefs(useChart);
    const { orderSendDate } = storeToRefs(useChart);
    const { orderReturnDate } = storeToRefs(useChart);
    const orderDeliveredDatesConfig = getOrderDateReport();
    const orderWatingPayDatesConfig = getOrderDateReport(`status=${OrderStatus.WatingPay}`);
    const orderCanceledDatesConfig = getOrderDateReport(`status=${OrderStatus.Cancel}`);
    const orderPaymentDatesConfig = getOrderDateReport(`status=${OrderStatus.Payment}`);
    const orderSendDateDatesConfig = getOrderDateReport(`status=${OrderStatus.Send}`);
    const orderReturnDateDatesConfig = getOrderDateReport(`status=${OrderStatus.Return}`);
    await useChart.getOrderDeliveredDate(orderDeliveredDatesConfig);
    await useChart.getOrderCanceledDate(orderCanceledDatesConfig);
    await useChart.getOrderWatingDate(orderWatingPayDatesConfig);
    await useChart.getOrderPaymentDate(orderPaymentDatesConfig);
    await useChart.getOrderSendDate(orderSendDateDatesConfig);
    await useChart.getOrderReturnedDate(orderReturnDateDatesConfig);
    let labels = [] as string[];
    for (let index = 1; index < 31; index++) {
        labels.push(`${30 - index} روز قبل`);
    }
    const chartDate: ChartData = {
        labels,
        datasets: [
            {
                label: 'تحویل داده شده',
                data: getDataAndLabel(orderDeliveredDates),
                borderColor: 'rgb(0, 256, 100)',
                backgroundColor: 'rgb(127,90,120)'
            },
            {
                label: 'لغو شده',
                data: getDataAndLabel(orderCanceledDates),
                borderColor: 'rgb(204, 204, 2)',
                backgroundColor: 'rgb(127,90,120)'
            },
            {
                label: 'در انتظار پرداخت',
                data: getDataAndLabel(orderWatingPayDates),
                borderColor: 'rgb(256, 0, 0)',
                backgroundColor: 'rgb(127,90,120)'
            },
            {
                label: 'پرداخت شده',
                data: getDataAndLabel(orderPaymentDates),
                borderColor: 'rgb(54, 54, 255)',
                backgroundColor: 'rgb(127,90,120)'
            },
            {
                label: 'ارسال شده',
                data: getDataAndLabel(orderSendDate),
                borderColor: 'rgb(25, 250, 255)',
                backgroundColor: 'rgb(127,90,120)'
            },
            {
                label: 'مرجوع شده',
                data: getDataAndLabel(orderReturnDate),
                borderColor: 'rgb(255, 128, 0)',
                backgroundColor: 'rgb(127,90,120)'
            }
        ]
    };
    const config: ChartConfiguration = {
        type: 'line',
        data: chartDate,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'تعداد سفارش ها در سی روز گذشته'
                }
            }
        },
    };
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
        new Chart(ctx, config);
    }
});
</script>
