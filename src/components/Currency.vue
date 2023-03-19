<template>
    <div>
        {{ convertToPersian(currency) }}
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { convertToPersian } from '@/common/helpers';
    const props = defineProps({
        money: Number
    });

    const number = ref(props.money);
    watch( () => props.money, money => {
        number.value = money;
    });

    const currency = computed( () => (((number.value || 0)/1).toFixed().replace('.', ','))
        .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
</script>