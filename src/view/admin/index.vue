<template>
    <layout />
</template>
<script>
import { useRouter } from "vue-router"
import { defineComponent, inject, onBeforeMount, onBeforeUpdate } from "@vue/runtime-core"
import Layout from "../../layout/index.vue"
export default defineComponent({
    components: {
        Layout
    },
    setup() {
        const router = useRouter()
        onBeforeMount(() => {
            const states = inject("states")
            console.log(states)
            // if (!states.loginStatus) {
            //     router.replace({ name: "Login" })
            // }
        })

    }
})
</script>

<style>
</style>