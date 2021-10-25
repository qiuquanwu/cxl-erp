import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'
import {
    // create naive ui
    create,
    // component
    NButton,
    NLayout,
    NLayoutSider,
    NLayoutContent,
    NLayoutFooter,
    NLayoutHeader,
    NSpace,
    NSwitch,
    NMenu,
    NIcon,
    NForm,
    NRow,
    NCol,
    NFormItem,
    NInput,
    NH1, NText, NMessageProvider, NDataTable, NDrawer, NDrawerContent, NInputGroup, NInputNumber, NModal, NCard, NTooltip, NSelect
} from "naive-ui";
const naive = create({
    components: [
        NButton,
        NLayout,
        NLayoutSider,
        NLayoutContent,
        NLayoutFooter,
        NLayoutHeader,
        NSpace,
        NSwitch,
        NMenu,
        NIcon,
        NForm,
        NRow,
        NCol,
        NFormItem,
        NInput,
        NH1, NText,
        NMessageProvider, NDataTable, NDrawer, NDrawerContent, NInputGroup, NInputNumber, NModal, NCard, NTooltip, NSelect
    ],
});
const app = createApp(App);
app.use(naive);
app.use(router);
app.mount("#app");
