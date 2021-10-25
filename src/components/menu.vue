<template>
    <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
    >
        <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :expand-icon="expandIcon"
            @update:value="handleUpdateValue"
        />
    </n-layout-sider>
</template>

<script>
import { h, ref, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
import { BookmarkOutline, CaretDownOutline, HomeOutline } from '@vicons/ionicons5'
import MaterialIcon from "../icon/Material.vue"
import ProductIcon from "../icon/Product.vue"
import Production from "../icon/Production.vue"
import { useRouter } from "vue-router"
function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
    {
        label: '工作台',
        key: 'Workbench',
        icon: renderIcon(HomeOutline)
    },
    {
        label: '物料管理',
        key: 'MaterialManagement',
        icon: renderIcon(MaterialIcon)
    },
    {
        label: '产品管理',
        key: 'Product',
        icon: renderIcon(ProductIcon)
    },
    {
        label: '生产管理',
        key: 'ProductionManagement',
        icon: renderIcon(Production)
    },
]

export default defineComponent({
    setup() {
        const router = useRouter()
        const handleUpdateValue = (key, item) => {
            router.replace({ name: key })
        }
        return {
            collapsed: ref(false),
            menuOptions,
            renderMenuLabel(option) {
                if ('href' in option) {
                    return h('a', { href: option.href, target: '_blank' }, option.label)
                }
                return option.label
            },
            renderMenuIcon(option) {
                // 渲染图标占位符以保持缩进
                if (option.key === 'sheep-man') return true
                // 返回 falsy 值，不再渲染图标及占位符
                if (option.key === 'food') return null
                return h(NIcon, null, { default: () => h(BookmarkOutline) })
            },
            expandIcon() {
                return h(NIcon, null, { default: () => h(CaretDownOutline) })
            },
            handleUpdateValue
        }
    }
})
</script>