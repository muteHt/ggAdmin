import { defineStore } from 'pinia'
export const useTabbarStore = defineStore('tabbar', {
    state: () => {
        return {
            fold: false,//参数控制导航栏折叠状态
            refresh: false//参数控制内容页面刷新
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
    },
})
