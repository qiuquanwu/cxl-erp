<template>
    <n-form :label-width="80" :model="formValue" :rules="rules" :size="size" ref="formRef">
        <n-form-item label="名称" path="name">
            <n-input v-model:value="formValue.name" placeholder="请输入名称" />
        </n-form-item>
        <n-form-item label="分类" path="type">
            <n-input placeholder="请输入分类" v-model:value="formValue.type" />
        </n-form-item>
        <n-form-item label="数量" path="count">
            <n-input-number placeholder="请输入数量" v-model:value="formValue.count" />
        </n-form-item>
        <n-form-item label="价格(元)" path="price">
            <n-input-number placeholder="请输入价格" v-model:value="formValue.price" />
        </n-form-item>
        <n-form-item>
            <n-button
                @click="handleValidateClick"
                attr-type="button"
                :loading="loading"
                :disabled="loading"
                color="#666699"
            >
                <template #icon>
                    <save-icon></save-icon>
                </template>
                保存
            </n-button>
        </n-form-item>
    </n-form>
</template>

<script>
import { defineComponent, reactive, ref, toRaw } from "@vue/runtime-core";
import { useMessage } from 'naive-ui'
import postData from "../../lib/postData.js"
import SaveIcon from "../../icon/Save.vue"
let rules = {
    name: {
        required: true,
        message: '名称不能为空',
        trigger: 'blur'
    },
    type: {
        required: true,
        message: '分类不能为空',
        trigger: ['input', 'blur']
    },
    count: {
        required: true,
        message: '数量不能为空',
        type: 'number',
        trigger: ['input', 'blur']
    },
    price: {
        required: true,
        message: '数量不能为空',
        type: 'number',
        trigger: ['input', 'blur']
    }
}
export default defineComponent({
    name: "MyForm",
    components: {
        SaveIcon
    },
    props: {
        modifyData: {
            default: null,
            type: Object
        },
        isEdit: {
            default: false,
            type: Boolean
        }
    },
    emits: ["saveOk"],
    setup(props, { emit }) {
        console.log(props.modifyData)
        const formRef = ref(null)
        const message = useMessage()
        const formValue = reactive({
            ...props.modifyData
        })
        const loading = ref(false)
        const save = (data) => {
            loading.value = true
            postData("api/materials/add", data)
                .then(data => {
                    console.log(data)
                    loading.value = false
                    message.success("新增成功！")
                    emit("saveOk")

                }) // JSON from `response.json()` call
                .catch(error => {
                    console.error(error)
                    message.error("服务器出错，请重新刷新！")
                })
        }
        const update = (data) => {
            loading.value = true
            postData("api/materials/update", data)
                .then(data => {
                    console.log(data)
                    loading.value = false
                    message.success("修改成功！")
                    emit("saveOk")
                }) // JSON from `response.json()` call
                .catch(error => {
                    console.error(error)
                    message.error("服务器出错，请重新刷新！")
                })
        }

        const handleValidateClick = (e) => {
            formRef.value.validate((errors) => {
                if (!errors) {
                    // message.success('正在保存！')
                    if (props.isEdit) {
                        update(toRaw(formValue))
                    } else {
                        save(toRaw(formValue))
                    }
                } else {
                    console.log(errors)
                    message.error('请输入完整！')
                }
            })
        }

        return {
            size: "large",
            formValue,
            formRef,
            rules,
            handleValidateClick,
            loading
        }
    }
})
</script>

<style>
</style>