<template>
    <!-- // 布局盒子 -->
    <div class="layout_box">
        <!-- //左侧导航 -->
        <div class="layout_left_slider" :class="{ fold_style: useSetingStore.fold }">
            <logo></logo>
            <!-- // 导航组件区 -->

            <el-scrollbar>
                <el-menu background-color="$base-menu-backgroud" active-text-color="#00A043" text-color="white" :collapse="useSetingStore.fold">
                    <Menu :menuList="useUserStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- //右侧内容合作 -->
        <div class="layout_right_box" :class="{ fold_style_active: useSetingStore.fold }">
            <!-- //顶部tabbar -->
            <div class="layout_top_tabbar">
                <Tabbar></Tabbar>
            </div>
            <!-- //内容框 -->
            <transition name="fade">
                <div class="layout_content" v-if="flag">
                    <component :is="Main"></component>
                </div>
            </transition>
        </div>
    </div>
</template>
<script lang="ts" setup>
//导入logo组件
import logo from "@/layout/logo/index.vue";
//导热油导航组件
import Menu from "@/layout/menu/index.vue";
//导入内容框
import Main from "@/views/main/index.vue";
//导入tabbar组件
import Tabbar from "@/layout/tabbar/index.vue";
//导入用户仓库
import UserStore from "@/store/modules/user/index.ts";
//导入settingStore仓库
import { settingStore } from "@/store/setting.ts";
import { watch, ref, nextTick } from "vue";
//注册tabbar仓库
let useSetingStore = settingStore();
//注册tUserStore仓库
let useUserStore = UserStore();
let flag = ref(true);
//监听tabbarStore中的Refresh参数进行变化
watch(
    () => useSetingStore.refresh,
    () => {
        flag.value = false;
        nextTick(() => {
            flag.value = true;
        });
    },
);
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.layout_box {
    display: flex;
    float: left;
    width: 100%;
    height: 100vh;
    .layout_left_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-backgroud;
        transition: all 0.3s;
        .el-scrollbar {
            height: calc(100% - $base-menu-logo-innerHeight - 40px);
            background: $base-menu-backgroud;
        }

        //折叠时导航框的最宽度样式
        &.fold_style {
            width: $min-menu-width;
        }
    }
    .layout_right_box {
        float: right;
        width: calc(100% - $base-menu_width);
        height: 100vh;
        transition: all 0.3s;
        &.fold_style_active {
            width: calc(100% - $min-menu-width);
        }
        .layout_top_tabbar {
            width: 100%;
            height: $base-tabbar-height;
            //background: $base-tabbar-backgroud;
        }
        .layout_content {
            display: flex;
            justify-content: center;
            width: 100%;
            height: calc(100% - $base-tabbar-height);
        }
    }
}
</style>
