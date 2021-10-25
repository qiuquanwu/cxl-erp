<template>
    <div class="bg-white">
        <n-row>
            <n-space>
                <add-button-vue @click="add"></add-button-vue>
                <del-button-vue :disabled="checkedRowKeys.length == 0" @click="remove"></del-button-vue>
                <n-button type="info">物料入库</n-button>

                <n-input-group>
                    <!-- <n-button type="primary">搜索</n-button> -->
                    <n-select v-model:value="field" :options="options" :style="{ width: '80px' }" />
                    <n-input
                        :style="{ width: '70%' }"
                        placeholder="请输入查询内容"
                        v-model:value="queryName"
                    />
                    <n-button type="primary" ghost @click="search">搜索</n-button>
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
        <n-drawer v-model:show="active" :width="400" placement="right">
            <n-drawer-content title="新增物料">
                <my-form @save-ok="fetchData"></my-form>
            </n-drawer-content>
        </n-drawer>
        <n-drawer v-model:show="modifyState" :width="400" placement="right">
            <n-drawer-content title="编辑">
                <my-form @save-ok="fetchData" :modifyData="modifyData" :isEdit="true"></my-form>
            </n-drawer-content>
        </n-drawer>
        <n-modal v-model:show="putInStorageState.showModal">
            <n-card
                style="width: 300px;"
                title="入库"
                :bordered="false"
                size="huge"
                preset="dialog"
                content-style="padding: 20px;"
                header-style="padding: 10px;"
                footer-style="padding: 20px;"
            >
                <n-input-number placeholder="请输入数量" v-model:value="putInStorageState.count" />
                <template #footer>
                    <n-button type="primary" @click="saveCount" color="#666699">
                        <template #icon>
                            <save-icon></save-icon>
                        </template>
                        保存
                    </n-button>
                </template>
            </n-card>
        </n-modal>
    </div>
</template>

<script>
import AddButtonVue from "../../components/button/AddButton.vue";
import DelButtonVue from "../../components/button/DelButton.vue";
import { onBeforeMount, ref, h, reactive, toRaw, nextTick } from "vue";
import getData from "../../lib/getData.js";
import postData from "../../lib/postData.js";
import { NButton, useMessage, NSpace } from "naive-ui";
import MyForm from "./MyForm.vue";
import EditIconButton from "../../components/button/EditIconButton.vue"
import SaveIcon from "../../icon/Save.vue"
const createColumns = ({ edit, putInStorage }) => {
    return [
        {
            type: "selection",
        },
        {
            title: "编号",
            key: "id",
            align: "center",
        },
        {
            title: "名称",
            key: "name",
            align: "center",
        },
        {
            title: "分类",
            key: "type",
        },
        {
            title: "数量",
            key: "count",
        },
        {
            title: "价格(元)",
            key: "price",
        },
        {
            title: "操作",
            key: "actions",
            render(row) {
                let action = [
                    h(
                        EditIconButton,
                        {
                            size: "small",
                            onClick: () => edit(row),
                            text: true
                        },
                        null
                    ),
                    h(
                        NButton,
                        {
                            size: "tiny",
                            onClick: () => putInStorage(row.id),
                            // text: true,
                            ghost: true,
                            type: "info",
                        },
                        { default: () => "入库" }
                    ),
                ];
                return h(NSpace, {}, { default: () => action });
            },
        },
    ];
};
export default {
    name: "MaterialManagement",
    components: {
        AddButtonVue,
        DelButtonVue,
        MyForm,
        SaveIcon
    },
    setup() {
        const message = useMessage();
        const add = () => {
            console.log(123);
            active.value = true;
        };

        const active = ref(false);
        const dataSource = ref([]);
        // 选中项
        const checkedRowKeysRef = ref([]);
        // 表格分页
        const pagination = reactive({
            pageSize: 10,
        });
        // 表格加载状态
        const loading = ref(false);
        const field = ref("name");
        const queryName = ref("");
        const fetchData = () => {
            loading.value = true;
            getData("api/materials/allList")
                .then((data) => {
                    dataSource.value = data;
                    loading.value = false;
                }) // JSON from `response.json()` call
                .catch((error) => {
                    console.error(error);
                    message.error("服务器出错，请重新刷新！");
                });
        };
        function queryByName(name, field) {
            loading.value = true;
            getData("api/materials/query", { name, field })
                .then((data) => {
                    console.log(data);
                    dataSource.value = data;
                    loading.value = false;
                }) // JSON from `response.json()` call
                .catch((error) => {
                    console.error(error);
                    message.error("服务器出错，请重新刷新！");
                });
        }
        const remove = () => {
            loading.value = true;
            postData("api/materials/remove", {
                ids: checkedRowKeysRef.value.toString(),
            })
                .then((data) => {
                    console.log(data);
                    if (data.data > 0) {
                        message.success(data.msg);
                    } else {
                        message.error(data.msg);
                    }
                    // 重新请求数据
                    fetchData();
                    // 重置选中
                    checkedRowKeysRef.value = [];
                    loading.value = false;
                }) // JSON from `response.json()` call
                .catch((error) => {
                    console.error(error);
                    message.error("服务器出错，请重新刷新！");
                });
        };
        const search = () => {
            queryByName(queryName.value, field.value);
        };
        onBeforeMount(() => {
            fetchData();
        });

        const modifyState = ref(false)
        const modifyData = ref(null)
        const edit = (row) => {
            console.log(toRaw(row));
            modifyData.value = toRaw(row)
            nextTick(() => {
                modifyState.value = true
            })
        };

        // 入库

        const putInStorageState = reactive({
            id: null,
            showModal: false,
            count: null
        })
        const putInStorage = (id) => {
            putInStorageState.id = id
            putInStorageState.showModal = true
        };
        const saveCount = () => {
            if (putInStorageState.count == null) {
                message.error("数量不能为空！")
                return
            }
            let data = {
                materialId: putInStorageState.id,
                count: putInStorageState.count,
                dataTime: new Date().getTime()
            }
            loading.value = true;
            postData("api/materials/putInStorage", data)
                .then((data) => {
                    console.log(data);
                    if (data.data > 0) {
                        message.success(data.msg);
                    } else {
                        message.error(data.msg);
                    }
                    // 重新请求数据
                    fetchData();
                    // 重置选中
                    loading.value = false;
                    putInStorageState.showModal = false;
                    putInStorageState.count = null;
                }) // JSON from `response.json()` call
                .catch((error) => {
                    console.error(error);
                    message.error("服务器出错，请重新刷新！");
                });
        }
        return {
            add,
            dataSource,
            columns: createColumns({
                edit,
                putInStorage
            }),
            pagination,
            active,
            checkedRowKeys: checkedRowKeysRef,
            handleCheck(rowKeys) {
                checkedRowKeysRef.value = rowKeys;
            },
            queryName,
            loading,
            search,
            remove,
            fetchData,
            modifyState,
            modifyData,
            putInStorage,
            putInStorageState,
            saveCount,
            field,
            options: [
                {
                    label: "名称",
                    value: 'name',
                },
                {
                    label: '分类',
                    value: 'type'
                }]
        };
    },
};
</script>

<style>
</style>
