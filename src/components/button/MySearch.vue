<template>
    <n-button type="primary">
        <template #icon>
            <search></search>
        </template>搜索
    </n-button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import { Search } from "@vicons/ionicons5"
export default defineComponent({
    name: "MySearch",
    components: {
        Search
    }
})
</script>

<style>
</style>