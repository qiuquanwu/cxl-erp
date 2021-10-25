<template>
    <div class="login-page">
        <div class="login-warp">
            <div style="text-align:center">
                <img src="../../assets/logo.png" class="login-logo" alt />
            </div>
            <div style="text-align:center">
                <n-h1 prefix="bar" align-text type="primary">
                    <n-text type="primary">创新林ERP</n-text>
                </n-h1>
            </div>
            <n-form :model="model" ref="formRef" :size="size" :rules="rules">
                <n-form-item path="name" label="账号">
                    <n-input v-model:value="model.name" placeholder="请输入账号" :size="size" />
                </n-form-item>
                <n-form-item path="password" label="密码">
                    <n-input
                        v-model:value="model.password"
                        placeholder="请输入密码"
                        type="password"
                        show-password-on="mousedown"
                        :size="size"
                        :maxlength="20"
                    />
                </n-form-item>
                <n-row :gutter="[0, 24]">
                    <n-col :span="24">
                        <div style="display: flex; justify-content: flex-end;">
                            <n-button
                                round
                                type="primary"
                                @click="doSubmit"
                                block
                                :size="size"
                                :loading="loading"
                            >登录</n-button>
                        </div>
                    </n-col>
                </n-row>
            </n-form>
        </div>
    </div>
</template>
<script>
import { ref, reactive, toRaw, inject } from "vue"
import { useMessage } from 'naive-ui'
import { useRouter } from "vue-router"
function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // parses response to JSON
}
export default {
    name: "Login",
    setup() {
        const formRef = ref(null)
        const modelRef = reactive({
            name: null,
            password: null,
        })
        const message = useMessage()
        const loading = ref(false)
        const changeLoginStatus = inject("changeLoginStatus")
        const router = useRouter()
        const doSubmit = () => {
            loading.value = true
            console.log(toRaw(modelRef))
            postData("api/user/login", toRaw(modelRef))
                .then(data => {
                    loading.value = false
                    if (data.code == 200) {
                        message.success("登录成功！")
                        console.log(data)
                        changeLoginStatus(data.data)

                    } else {
                        message.error(data.msg)
                    }
                }) // JSON from `response.json()` call
                .catch(error => console.error(error))
        }
        return {
            formRef,
            model: modelRef,
            size: "large",
            rules: {
                name: {
                    required: true,
                    message: '请输入账号！',
                    trigger: 'blur'
                },
                password: {
                    required: true,
                    message: '请输入密码！',
                    trigger: ['input', 'blur']
                }
            },
            doSubmit,
            loading
        }
    }
}
</script>

<style scoped>
.login-page {
    width: 100vw;
    height: 100vh;
    padding-top: 150px;
    box-sizing: border-box;
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
.login-warp {
    width: 400px;
    height: auto;
    margin: 0 auto;
    background-color: white;
    /* text-align: center; */
    border-radius: 10px;
    padding: 30px;
}
.login-logo {
    width: 80px;
    height: 80px;
}
</style>