<template>
    <div class="h-screen overflow-hidden">
        <header/>
        <AdminLinks/>
        <slot />
    </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import AdminLinks from '../Links/AdminLinks.vue'

export default {
    name: "AppLayoutHome",

    components: {
        AdminLinks,
    },

    setup () {

        return {
            // isLoggined: computed( () => store.getters['adminAuth/checkAuth'])
        }
    }
}
</script>