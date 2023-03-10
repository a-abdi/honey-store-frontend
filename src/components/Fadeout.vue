<template>
    <div :style="{ opacity: opacity }">
        <slot />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
    const props = defineProps({
        fadeTime: {
            type: Number,
            default: 10000
        },

        fadeStep: {
            type: Number,
            default: 40
        },

        fadeOn: {
            type: Boolean,
            default: false
        },
    });

    const emits = defineEmits(['fadeOff']);
    const opacity = ref(0);
    const timeOut = ref(0);
    const opacityID = ref([0]);

    const run = () => {
        timeOut.value  = 0
        for (let index = 0; index < props.fadeStep; index++) {
            opacityID.value[index] = setTimeout(() => {
                opacity.value = 1 - index/props.fadeStep
            }, timeOut.value);
            
            timeOut.value += props.fadeTime/props.fadeStep;
        }
        emits('fadeOff');
    };

    const stop = () => {
        for (let index = 0; index < props.fadeStep; index++) {
            clearTimeout(opacityID.value[index]);
        }
        opacity.value = 0;
    };

    watch( 
        () => props.fadeOn,
        fadeOn => {
            if(fadeOn) {
                stop();
                run();
            }
        }
    );
</script>