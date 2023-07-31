<template>
    <Fadeout :fadeTime="fadeTime" :fadeOn="newMessage" @fadeOff='$emit("fadeMessage")'>
        <div 
            v-if="message"
            :class="{'bg-green-600': success, 'bg-red-600': danger, 'bg-yellow-600': warning}" 
            class="absolute text-white whitespace-nowrap text-xs md:text-sm 2xl:text-base p-2 tracking-wider border rounded-md bottom-0 right-0 shadow-lg z-40"
        >
            {{ message }}
        </div>
    </Fadeout>
</template>

<script setup lang="ts">
    import { ref, watch, type PropType } from 'vue';
    import Fadeout from '../Fadeout.vue';

    const props = defineProps({
        typeMessage: {
            type: String,
            default: 'success'
        },

        message: {
            type: String as PropType<string>,
            default: 'Successful'
        },
       
        fadeTime: {
            type: Number,
            default: 5000
        },

        showMessage: {
            type: Boolean,
            default: false
        }
    });

    const success = ref(true);
    const danger  = ref(false);
    const warning = ref(false);
    const newMessage = ref(false);

    watch( 
        () => props.typeMessage,
        type => {
            if(type == 'success') {
                success.value = true;
                danger.value = false;
                warning.value = false;
            }
    
            if(type == 'danger') {
                success.value = false;
                danger.value = true;
                warning.value = false;
            }
    
            if(type == 'warning') {
                success.value = false;
                danger.value = false;
                warning.value = true;
            }
        }
    );

    watch(
        () => props.showMessage,
        showMessage => {
            if(showMessage) {
                newMessage.value = true;
            }
            else {
                newMessage.value = false;
            }
        }
    );
</script>