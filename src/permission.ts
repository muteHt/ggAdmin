// 导入路由器
import router from '@/router'
//导入进度条
import nprogress from 'nprogress'
//导入进度条样式
import 'nprogress/nprogress.css'
//导入用户仓库
import UserStore from './store/modules/user'
//导入pinia
import pinia from '@/store/index.ts'

let tempUserStore = UserStore(pinia);

// 添加全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    //to:访问的路由对象
    //from:跳转过来的那个路由
    //访问某个路由之前的
    // console.log("before")
    nprogress.start()

    let token = localStorage.getItem("user_token");
    let userName = tempUserStore.userName;
    //用户登录
    if (token) {
        //登录成功，访问login,不能访问，指向首页
        if (to.path == '/login') {
            next({ path: '/' })
        }
        else {
            //检测是否有用户信息访问其余路由
            if (!userName) {
                try {
                    //获取用户信息
                    await tempUserStore.userInfo();
                    next({ ...to });
                } catch (error) {
                    //获取不到就退出并跳转
                    tempUserStore.userLayout();
                    next({ path: '/login', query: { redirect: to.path } })
                }
            } else {
                next();
            }
        }
    } else {
        // 用户未登录
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login' })

        }

    }





})
//添加全局后置守卫
router.afterEach((to: any, from: any) => {
    // console.log("after")
    nprogress.done()

})

//用户未登录不能访问别的路由全部指向登录页
//登录成功之后，可以访问别的路由但是不能访问登录页

