<template>
    <div>
        {{ convertToPersian(currency) }}
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { convertToPersian } from '@/common/helpers';

    const props = defineProps({
        money: Number
    });
    const money = props.money || 0;
    const currency = computed( () => (
            (money/1)
            .toFixed()
            .replace('.', ',')
        ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
</script>