<template>
    <el-card style="width: 100%">
        <el-form inline="true">
            <el-form-item label="一级分类">
                <el-select :disabled="scene == 0 ? false : true" v-model="tempCateStore.cate1Id" placeholder="请选择" size="large" style="width: 240px" @change="handleCHange1">
                    <el-option v-for="item in tempCateStore.cate1List" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="scene == 0 ? false : true" v-model="tempCateStore.cate2Id" placeholder="请选择" size="large" style="width: 240px" @change="handleCHange2">
                    <el-option v-for="item in tempCateStore.cate2List" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select :disabled="scene == 0 ? false : true" v-model="tempCateStore.cate3Id" placeholder="请选择" size="large" style="width: 240px" @change="handleCHange3">
                    <el-option v-for="item in tempCateStore.cate3List" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script lang="ts" setup>
import { onMounted, defineProps } from "vue";
import CategoryStore from "@/store/modules/category/index.ts";
let tempCateStore = CategoryStore();
//定义父组件传过来的参数
defineProps(["scene"]);
//周期函数
onMounted(() => {
    tempCateStore.getCate1();
});

//点击事件
const handleCHange1 = () => {
    //获取数据前清空二三级数据
    tempCateStore.cate2List = [];
    tempCateStore.cate3List = [];
    tempCateStore.cate2Id = "";
    tempCateStore.cate3Id = "";
    //获取二级数据
    tempCateStore.getCate2();
};
const handleCHange2 = () => {
    //获取数据前清空三级数据
    tempCateStore.cate3List = [];
    tempCateStore.cate3Id = "";
    //获取三级数据
    tempCateStore.getCate3();
};
const handleCHange3 = () => {
    //获取属性数据
};

//获取二级分类
</script>
