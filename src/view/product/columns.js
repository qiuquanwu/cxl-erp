import { h } from "vue"
import EditIconButton from "../../components/button/EditIconButton.vue"
import Details from "../../components/button/Details.vue"
import { NButton, useMessage, NSpace } from "naive-ui";
export default () => {
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
            title: "库存(份)",
            key: "stock",
        },
        {
            title: "价格(元)",
            key: "price",
        },
        {
            title: "简介",
            key: "introduce",
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
                            onClick: () => { },
                            text: true
                        },
                        null
                    ),
                    h(
                        Details,
                        {
                            size: "small",
                            onClick: () => { },
                            text: true
                        },
                        null
                    ),
                ];
                return h(NSpace, {}, { default: () => action });
            },
        },
    ];
};