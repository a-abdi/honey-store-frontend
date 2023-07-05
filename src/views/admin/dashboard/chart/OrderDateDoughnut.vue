<template>
    <div class="w-full">
        <p class="text-indigo-900 text-center mt-4">
            تعداد سفارش ها در سی روز گذشته
        </p>
        <canvas id="orderDatePie" width="100" height="100"></canvas>
    </div>
</template>

<script lang="ts" setup>
import { useChartStore } from '@/stores/chart';
import type { ChartConfiguration, ChartData } from 'chart.js';
import Chart from 'chart.js/auto';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const useChart = useChartStore();
let chart: Chart;
let chartDate: ChartData;
onMounted(async () => {
    const { orderStatus } = storeToRefs(useChart);
    const data = orderStatus.value?.data.map(order => order.count);
    if (data) {
        const status = [
            'در انتظار پرداخت',
            'پرداخت شده',
            'لغو شده',
            'فرستاده شده',
            'مرجوع شده',
            'تحویل داده شده',
        ]
        const labels = orderStatus.value?.data.map(order => status[order._id])
        chartDate = {
            labels,
            datasets: [
                {
                    label: 'تعداد',
                    data: data.sort(),
                    borderColor: 'rgb(100, 100, 100)',
                    backgroundColor: ['rgb(256, 0, 0)', 'rgb(54, 54, 255)', 'rgb(204, 204, 2)', 'rgb(25, 250, 255)', 'rgb(255, 128, 0)', 'rgb(0, 256, 100)']
                },
            ]
        };
        const config: ChartConfiguration = {
            type: 'doughnut',
            data: chartDate,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'left',
                        rtl: true,
                        labels: {
                            font: {
                                size: 10,
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
        const ctx = document.getElementById('orderDatePie') as HTMLCanvasElement;
        if (ctx) {
            chart = new Chart(ctx, config);
        }
    }
});
</script>
