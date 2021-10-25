<template>
    <div class="bg-white">
        <n-row>
            <n-space>
                <add-button-vue></add-button-vue>
                <del-button-vue :disabled="checkedRowKeys.length == 0"></del-button-vue>
                <n-input-group>
                    <!-- <n-button type="primary">搜索</n-button> -->
                    <n-select v-model:value="field" :options="options" :style="{ width: '80px' }" />
                    <n-input
                        :style="{ width: '70%' }"
                        placeholder="请输入查询内容"
                        v-model:value="queryText"
                    />
                    <my-search ghost @click="query"></my-search>
                </n-input-group>
            </n-space>
        </n-row>

        <div class="mt-10">
            <n-data-table
                :columns="columns"
                :data="dataSource"
                :pagination="pagination"
                :row-key="(row) => row.id"
                @update:checked-row-keys="handleCheck"
                :loading="loading"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent, onBeforeMount } from "@vue/runtime-core";
import AddButtonVue from "../../components/button/AddButton.vue";
import DelButtonVue from "../../components/button/DelButton.vue";
import { ref } from "vue"
import getData from "../../lib/getData.js";
import columns from "./columns.js"
// src\components\hooks\useQuery.js
import useQuery from "../../hooks/useQuery.js"
import MySearch from '../../components/button/MySearch.vue'
import { useMessage } from "naive-ui";
export default defineComponent({
    name: "Product",
    components: {
        AddButtonVue, DelButtonVue, MySearch
    },
    setup() {
        const dataSource = ref([])
        const loading = ref(false)
        // 选中项
        const checkedRowKeysRef = ref([]);
        const fetchData = () => {
            loading.value = true;
            getData("api/product/list")
                .then((data) => {
                    console.log(data);
                    dataSource.value = data;
                    loading.value = false;
                }) // JSON from `response.json()` call
                .catch((error) => {
                    console.error(error);
                    message.error("服务器出错，请重新刷新！");
                });
        };
        onBeforeMount(() => {
            fetchData()
        })

        // 搜索
        const { queryText, field, query } = useQuery("api/product/query", dataSource, loading)
        return {
            queryText,
            field,
            query,
            options: [
                {
                    label: "名称",
                    value: 'name',
                },
                {
                    label: '分类',
                    value: 'type'
                }, {
                    label: '简介',
                    value: 'introduce'
                }],
            columns: columns(),
            dataSource,
            pagination: {
                pageSize: 10,
            },
            loading,
            handleCheck(rowKeys) {
                checkedRowKeysRef.value = rowKeys;
            },
            checkedRowKeys: checkedRowKeysRef
        }
    }
})
</script>

<style>
.bg-white {
    background-color: white;
    padding: 10px;
}
</style>