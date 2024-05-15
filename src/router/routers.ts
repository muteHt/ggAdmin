
export const constantRoutes = [
    {
        path: "/login",
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: "登录", //菜单标题
            hidden: true, //控制路由显示隐藏
            icon: 'Check' //图标
        }
    },
    {
        path: "/",
        component: () => import('@/layout/index.vue'),
        name: '',
        redirect: "/home",
        meta: {
            title: "", //菜单标题
            hidden: false, //控制路由显示隐藏
            icon: 'Menu'//图标
        },
        children: [{
            path: "/home",
            component: () => import('@/views/home/index.vue'),
            name: 'home',
            meta: {
                title: "首页",//菜单标题
                hidden: false, //控制路由显示隐藏
                icon: 'HomeFilled' //图标
            }
        }]
    },
    {
        path: "/404",
        component: () => import('@/views/myerror/index.vue'),
        name: '404',
        meta: {
            title: "404", //菜单标题
            hidden: true,//控制路由显示隐藏
            icon: 'Switch' //图标
        }
    },
    {
        path: "/screen",
        component: () => import('@/views/screen/index.vue'),
        name: 'screen',
        meta: {
            title: "数据大屏", //菜单标题
            hidden: false,//控制路由显示隐藏
            icon: 'Platform' //图标
        }
    },
];
export const asyncRoutes = [
    //权限管理路由
    {
        path: "/acl",
        component: () => import('@/layout/index.vue'),
        name: 'acl',
        redirect: "/acl/user",
        meta: {
            title: "权限管理", //菜单标题
            hidden: false,//控制路由显示隐藏
            icon: 'Lock' //图标
        },
        children: [{
            path: "/acl/user",
            component: () => import('@/views/acl/user/index.vue'),
            name: 'user',
            meta: {
                title: "用户管理", //菜单标题
                hidden: false,//控制路由显示隐藏
                icon: 'User' //图标
            },
        },
        {
            path: "/acl/role",
            component: () => import('@/views/acl/role/index.vue'),
            name: 'role',
            meta: {
                title: "角色管理", //菜单标题
                hidden: false,//控制路由显示隐藏
                icon: 'User' //图标
            }
        },

        {
            path: "/acl/manu",
            component: () => import('@/views/acl/manu/index.vue'),
            name: 'manu',
            meta: {
                title: "菜单管理", //菜单标题
                hidden: false,//控制路由显示隐藏
                icon: 'Monitor' //图标
            },
        }
        ]
    },
    //商品管理路由
    {
        path: "/layout/product",
        component: () => import('@/layout/index.vue'),
        name: 'product',
        redirect: "/product/trademark",
        meta: {
            title: "商品管理",
            hidden: false,
            icon: 'Goods'
        },
        children: [{
            path: "/product/trademark",
            component: () => import('@/views/product/trademark/index.vue'),
            name: 'trademark',
            meta: {
                title: '品牌管理',
                hidden: false,
                icon: 'ShoppingCartFull'
            },
        },
        {
            path: "/product/attr",
            component: () => import('@/views/product/attr/index.vue'),
            name: 'attr',
            meta: {
                title: '属性管理',
                hidden: false,
                icon: 'ChromeFilled'
            }
        },
        {
            path: "/product/spu",
            component: () => import('@/views/product/spu/index.vue'),
            name: 'spu',
            meta: {
                title: 'spu管理',
                hidden: false,
                icon: 'Calendar'
            }
        },
        {
            path: "/product/sku",
            component: () => import('@/views/product/sku/index.vue'),
            name: 'sku',
            meta: {
                title: 'sku管理',
                hidden: false,
                icon: 'Orange'
            }
        },

        ]
    }
];

export const anyRoutes =
//任意路由
{
    path: '/:pathMathch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: "任意路由",
        hidden: true,
        icon: 'DataLine'
    },
    component: () => import("@/views/myerror/index.vue"),
}

