<template>
    <n-layout has-sider>
        <my-menu></my-menu>
        <n-layout>
            <n-layout-header>
                <my-header></my-header>
            </n-layout-header>
            <n-layout-content content-style="padding: 20px;">
                <router-view></router-view>
            </n-layout-content>
            <!-- <n-layout-footer>成府路</n-layout-footer> -->
        </n-layout>
    </n-layout>
</template>

<script>
import MyMenu from "../components/menu.vue"
import MyHeader from "../components/MyHeader.vue"
export default {
    components: {
        MyMenu,
        MyHeader
    }
}
</script>

<style>
.n-layout-header,
.n-layout-footer {
    height: 7vh;
}

.n-layout-sider {
    height: 100vh;
}

.n-layout-content {
    background: #f8f8f9;
    height: 93vh;
}
</style>