<template>
    <n-button type="primary">
        <template #icon>
            <add></add>
        </template>
        新增
    </n-button>
</template>

<script>
import Add from "../../icon/Add.vue"
export default {
    name: "AddButton",
    components: {
        Add
    },
}
</script>

<style>
</style>