<template>
    <div class="tabbar_box">
        <!-- 左侧盒子 -->
        <div class="tabbar_left_box">
            <!-- 按钮 -->
            <el-icon size="24px" @click="toggle">
                <component :is="tabbar.fold ? 'Expand' : 'Fold'"></component>
            </el-icon>
            <el-breadcrumb separator=">">
                <!-- 面包屑盒子 -->
                <!-- 获取路由生成面包屑 -->
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-show="item.meta.title" :to="item.path">
                    <div class="bread_box">
                        <el-icon size="18px">
                            <component :is="item.meta.icon"> </component>
                        </el-icon>
                        <!-- 面包屑标题 -->
                        <span class="bread_title">{{ item.meta.title }}</span>
                    </div>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="tabbar_right_box">
            <el-button :icon="Refresh" circle @click="refresh_content" />
            <el-button :icon="FullScreen" circle @click="FullScreen_page" />
            <el-button :icon="Setting" circle @click="setColor" />
            <img :src="useUserStore.avatar" alt="#" />
            <el-dropdown>
                <el-button class="el-dropdown-link">
                    {{ useUserStore.userName }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-button plain @click="layout">退出登录</el-button>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <!-- 抽屉组件 -->
        <el-drawer v-model="drawer" size="300px">
            <template #header>
                <h4>主题切换</h4>
            </template>
            <template #default>
                <el-form>
                    <el-form-item label="主题颜色"> <el-color-picker v-model="color" @change="setTheme" /></el-form-item>
                    <el-form-item :label="dark ? '夜晚模式' : '白天模式'">
                        <el-switch v-model="dark" @change="handleChange" active-action-icon="Sunny" inactive-action-icon="Moon" />
                    </el-form-item>
                </el-form>
            </template>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>
import { Refresh, FullScreen, Setting } from "@element-plus/icons-vue";
import { useTabbarStore } from "@/store/modules/tabbar/index.ts";
import { settingStore } from "@/store/setting.ts";
import { useRouter, useRoute } from "vue-router";
import UserStore from "@/store/modules/user/index.ts";
//import setting from "../../setting";
import { ref } from "vue";
const color = ref("#124EE7");
//控制开关
const dark = ref(false);
//控制抽屉显示隐藏
const drawer = ref<any>(false);
//导入useRouter对象
const $router = useRouter();
//导入route对象
const $route = useRoute();
//获取tabbar数据仓库
let tabbar = useTabbarStore();
const useSettingStore = settingStore();
//获取用户数据仓库
let useUserStore = UserStore();
//折叠导航
const toggle = () => {
    //获取导航参数并修改参数
    useSettingStore.fold = !useSettingStore.fold;
};
//主题切换事件
const handleChange = () => {
    let html = document.documentElement;
    dark.value ? (html.className = "dark") : (html.className = "");
};
//主题颜色发生变化
const setTheme = () => {
    let html = document.documentElement;
    html.style.setProperty("--el-color-primary", color.value);
    html.style.setProperty("--el-color-warning", color.value);
};
//导航跳转
const toRoute = (path: any) => {
    $router.push(path);
};
//点击进行刷新
const refresh_content = () => {
    //监听全局刷新参数如果发生变化进行内容组件的重新构建和挂载
    useSettingStore.refresh = !useSettingStore.refresh;
};
//点击设置按钮弹出主题设框
const setColor = () => {
    drawer.value = true;
};
//点击进行全屏切换
const FullScreen_page = () => {
    //调用dom对象的全屏参数
    //再次点击退出全屏
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

//退出登录
const layout = () => {
    alert("退出登录");
    //1清除用户信息
    useUserStore.userLayout();
    //2请求后端退出登录路径

    //3跳转到登录页
    $router.push("/login");
};
</script>

<style lang="scss" scoped>
.bread_title {
    font-size: 16px;
}
.bread_box {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.tabbar_box {
    display: flex;
    height: 100%;

    justify-content: space-between;

    .tabbar_left_box {
        display: flex;
        height: 100%;
        align-items: center;

        > .el-icon {
            margin: 0 20px;
        }
    }
    .tabbar_right_box {
        display: flex;
        height: 100%;
        align-items: center;
        img {
            margin: 0 10px;
            height: 40px;
            width: 40px;
            border-radius: 20px;
        }
    }
}
</style>
