import { defineStore } from 'pinia'

import { loginForm } from '@/api/user/type'

import router from "@/router/index.ts"

import { reqLogin, reqUserInfo } from './mock.ts'
//import { reqLogin, reqUserInfo } from '@/api/user'
import { constantRoutes, asyncRoutes, anyRoutes } from '@/router/routers'
import cloneDeep from 'clone-deep'

const UserStore = defineStore("User", {
    state: () => {
        return {

            user_token: localStorage.getItem("user_token"),//用户唯一标识

            menuRoutes: constantRoutes,//用户路由

            userName: "",//用户名

            avatar: "",//用户头像
            userId: localStorage.getItem("userId")
        }
    },
    getters: {

    },
    actions: {

        //用户登录的方法
        async userLogin(data: loginForm) {

            let result = await reqLogin(data);

            if (result.code === 200) {

                localStorage.setItem("user_token", result.data.token);
                localStorage.setItem("userId", result.data.userId)
                this.user_token = localStorage.getItem("user_token");
                this.userId = localStorage.getItem("userId");

                return 'ok'
            }
            else {
                return Promise.reject(new Error(result.data.message));
            }
        },
        async userInfo() {

            let result = await reqUserInfo(this.userId);
            //计算当前用户需要展示的异步路由
            //let tempasyncRoutes = JSON.parse(JSON.stringify(asyncRoutes));

            let userAsyncRoutes = filterAsyncRoute(cloneDeep(asyncRoutes), result.data.checkUser.routes);
            //菜单需要的数据整理
            this.menuRoutes = [...constantRoutes, ...userAsyncRoutes, anyRoutes];
            //动态添加异步路由和动态路由
            [...userAsyncRoutes, anyRoutes].forEach((route: any) => {
                router.addRoute(route);
            })
            if (result.code === 200) {
                this.userName = result.data.checkUser.username
                this.avatar = result.data.checkUser.avatar
                return 'ok'
            }
            else {
                return Promise.reject(new Error(result.data.message));
            }

        },
        userLayout() {

            this.user_token = "";
            this.userName = "";
            this.avatar = "";
            localStorage.removeItem("user_token");
            localStorage.removeItem("userId");
        }

    }

})

//过滤异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
    return asyncRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {

                item.children = filterAsyncRoute(item.children, routes);

            }
            return true;
        }
    })
}

export default UserStore;
