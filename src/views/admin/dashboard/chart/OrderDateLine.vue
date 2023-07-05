<template>
    <div class="overflow-auto">
        <div class="min-w-144">
            <div class="w-full mt-4">
                <p class="text-indigo-900 text-center">
                    تعداد وضیعت های سی روز گذشته
                </p>
                <canvas id="myChart" width="400" height="150"></canvas>
            </div>
            <div class="py-4 px-8 text-xs border-t border-gray-200">
                <button @click="addChart"
                    class="bg-transparent border border-white hover:bg-blue-200 hover:border hover:border-blue-400 text-blue-800 font-semibold py-1.5 sm:px-4 px-2 rounded-md">
                    مجموعه جدید
                </button>
                <button @click="removeChart"
                    class="bg-transparent border border-white hover:bg-blue-200 hover:border hover:border-blue-400 text-blue-800 font-semibold py-1.5 sm:px-4 px-2 rounded-md">
                    حذف مجموعه 
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useChartStore } from '@/stores/chart';
import type { ChartConfiguration, ChartData, ChartDataset } from 'chart.js';
import Chart from 'chart.js/auto';
import { storeToRefs } from 'pinia';
import { onMounted, type Ref } from 'vue';
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
let chart: Chart;
let chartDate: ChartData;
let listChartInfo: ChartDataset[];
onMounted(async () => {
    const { orderCanceledDates } = storeToRefs(useChart);
    const { orderDeliveredDates } = storeToRefs(useChart);
    const { orderPaymentDates } = storeToRefs(useChart);
    const { orderWatingPayDates } = storeToRefs(useChart);
    const { orderSendDate } = storeToRefs(useChart);
    const { orderReturnDate } = storeToRefs(useChart);
    let labels = [] as string[];
    for (let index = 1; index < 31; index++) {
        labels.push(`${index}`);
    }
    chartDate = {
        labels,
        datasets: [
            {
                label: 'تحویل داده شده',
                data: getDataAndLabel(orderDeliveredDates),
                borderColor: 'rgb(0, 256, 100)',
                backgroundColor: 'rgb(0, 256, 100)'
            },
        ]
    };
    const config: ChartConfiguration = {
        type: 'line',
        data: chartDate,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'left',
                    rtl: true,
                    labels: {
                        font: {
                            size: 12,
                            family: "'iranyekan', 'Helvetica', 'Arial', 'sans-serif'"
                        }
                    }
                },
            },
            layout: {
                padding: 20
            },
        },
    };
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
        chart = new Chart(ctx, config);
    }
    listChartInfo = [
        {
            label: 'مرجوع شده',
            data: getDataAndLabel(orderReturnDate),
            borderColor: 'rgb(255, 128, 0)',
            backgroundColor: 'rgb(255, 128, 0)'
        },
        {
            label: 'ارسال شده',
            data: getDataAndLabel(orderSendDate),
            borderColor: 'rgb(25, 250, 255)',
            backgroundColor: 'rgb(25, 250, 255)'
        },
        {
            label: 'لغو شده',
            data: getDataAndLabel(orderCanceledDates),
            borderColor: 'rgb(204, 204, 2)',
            backgroundColor: 'rgb(204, 204, 2)'
        },
        {
            label: 'پرداخت شده',
            data: getDataAndLabel(orderPaymentDates),
            borderColor: 'rgb(54, 54, 255)',
            backgroundColor: 'rgb(54, 54, 255)'
        },
        {
            label: 'در انتظار پرداخت',
            data: getDataAndLabel(orderWatingPayDates),
            borderColor: 'rgb(256, 0, 0)',
            backgroundColor: 'rgb(256, 0, 0)'
        },
    ]
});

const addChart = () => {
    const chartInfo = listChartInfo.pop();
    if (chartInfo) {
        chartDate.datasets.push(chartInfo);
    }
    chart.update();
};

const removeChart = () => {
    const chartInfo = chartDate.datasets.pop();
    if (chartInfo) {
        listChartInfo.push(chartInfo);
    }
    chart.update();
};

</script>
