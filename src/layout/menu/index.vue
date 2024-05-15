<template>
    <!-- <p>{{ menuList }}</p> -->
    <template v-for="item in menuList" :key="item.path">
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" @click="goRoute" :index="item.path">
                <!-- 没有子路由 -->
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由且只有一个 -->
        <template v-if="item.children">
            <el-menu-item v-if="!item.meta.hidden && item.children.length === 1" :index="item.path" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 有子路由且子路由大于一个 -->
        <template v-if="item.children">
            <el-sub-menu v-if="!item.meta.hidden && item.children.length > 1" :index="item.path">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span> {{ item.meta.title }} </span>
                </template>
                <Menu :menuList="item.children"> </Menu>
            </el-sub-menu>
        </template>
    </template>
</template>
<script lang="ts" setup>
// 获取父组件传过来的数据
import { useRouter } from "vue-router";
//获取路由器
const $router = useRouter();
//定义父组件传过来的参数
defineProps(["menuList"]);
//路由跳转
const goRoute = (vc: any) => {
    $router.push(vc.index);
};
</script>
<script lang="ts">
export default {
    name: "Menu",
};
</script>

<style lang="scss" scoped></style>
