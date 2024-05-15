import { defineStore } from 'pinia'
export const settingStore = defineStore('setting', {
    state: () => {
        return {
            fold: false,//参数控制导航栏折叠状态
            refresh: false//参数控制内容页面刷新
        }
    },
})
