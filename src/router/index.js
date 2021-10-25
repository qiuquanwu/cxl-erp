import { createRouter, createWebHashHistory } from "vue-router"
const routes = [
    { path: '/', redirect: '/admin' },
    { path: '/login', name: "Login", component: () => import("../view/login/index.vue") },
    {
        path: '/admin', name: "Admin", redirect: '/admin/', component: () => import("../view/admin/index.vue"), children: [
            {
                // 当 /user/:id/profile 匹配成功 
                // UserProfile 将被渲染到 User 的 <router-view> 内部
                path: '',
                name: "Workbench",
                component: () => import("../view/workbench/index.vue"),
            },
            {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 将被渲染到 User 的 <router-view> 内部
                path: 'material-management',
                name: "MaterialManagement",
                component: () => import("../view/material-management/index.vue"),
            },
            {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 将被渲染到 User 的 <router-view> 内部
                path: 'product',
                name: "Product",
                component: () => import("../view/product/index.vue"),
            },
            {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 将被渲染到 User 的 <router-view> 内部
                path: 'production-management',
                name: "ProductionManagement",
                component: () => import("../view/production-management/index.vue"),
            },
        ],
    },
]
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

export default router