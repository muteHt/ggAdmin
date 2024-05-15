<template>
    <div class="spu_box">
        <category :scene="scene"></category>
        <el-card style="margin: 10px 0">
            <div v-show="scene == 0">
                <!-- table组件 -->
                <el-button type="primary" plain icon="Plus" @click="addSpu(tempCate.cate3Id)" :disabled="tempCate.cate3Id ? false : true">添加SPU</el-button>
                <el-table :data="tableData" max-height="500px">
                    <el-table-column label="序号" type="index" width="180"> </el-table-column>
                    <el-table-column prop="spuName" label="SPU名称" width="280"> </el-table-column>
                    <el-table-column prop="description" label="SPU描述" show-overflow-tooltip width="280"> </el-table-column>
                    <el-table-column label="SPU操作" width="480">
                        <template #default="scope">
                            <el-button type="primary" icon="Plus" @click="tosku(scope.row)"> 添加sku</el-button>
                            <el-button type="primary" icon="Edit" @click="hadleEdit(scope.row)">修改</el-button>
                            <el-button type="primary" icon="view" @click="showSkuList(scope.row)"> 查看</el-button>

                            <el-popconfirm title="你确定要删除当前数据？" @confirm="handleConfirm(scope.row.id)">
                                <template #reference>
                                    <!-- 删除一行的事件 -->
                                    <el-button type="danger" icon="Delete">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器组件 -->
                <el-pagination
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :page-sizes="[5, 8, 10, 12]"
                    layout="prev,pager, next,->,sizes,total,jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
            <spuform v-show="scene == 1" @changeScene="changeScene" ref="spu"></spuform>
            <skuform v-show="scene == 2" @changeScene="changeScene" ref="sku"></skuform>
        </el-card>
        <el-dialog v-model="dialogTableVisible" title="sku展示列表" width="800">
            <el-table border :data="skuTable" max-height="500px">
                <el-table-column prop="skuName" label="SKU名称" width="180"> </el-table-column>
                <el-table-column prop="price" label="sku价格" show-overflow-tooltip width="180"> </el-table-column>
                <el-table-column prop="weight" label="sku重量" show-overflow-tooltip width="180"> </el-table-column>
                <el-table-column label="sku图片" show-overflow-tooltip width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-image :src="scope.row.skuDefaultImg" style="width: 100px; height: 100px" />
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import spuform from "./spuform.vue";
import skuform from "./skuform.vue";
import { onBeforeUnmount, ref, watch } from "vue";
import CategoryStore from "@/store/modules/category/index.ts";
import { reqSpu, reqDelete } from "@/api/prod/spu/index.ts";
import { reqSkuList } from "../../../api/prod/sku";
import { ElMessage } from "element-plus";

// 数据区域
const tempCate = CategoryStore();

//用于显示和隐藏sku展示列表
const dialogTableVisible = ref<any>(false);
//用于接收spu组件实例
const spu = ref<any>();
//用于接收sku组件实例
const sku = ref<any>();
//监听数据仓库里边的cate3id数据
watch(
    () => tempCate.cate3Id,
    () => {
        //监听仓库里边的cate3id属性如果发生变化便获取属性数据
        tableData.value = [];

        if (!tempCate.cate3Id) return;

        //    调用获取数据请求
        getAllSpu();
    },
);
//控制显示隐藏的属性
const scene = ref<number>(0);
//分页器当前页码
const currentPage = ref<number>(1);
//分页器显示总的数据条数
const total = ref<number>(10);
//分页器页面尺寸
const pageSize = ref<number>(5);
//表格数据
const tableData = ref<any>([]);
//sku列表的数据
const skuTable = ref<any>([]);
//发送请求函数位置
const getAllSpu = async (page = 1, limit = 5) => {
    let result = await reqSpu(page, limit, tempCate.cate3Id);
    if (result.code == 200) {
        //将结果存到tabledata中
        tableData.value = result.data.records;
        //将页面组件数据保存
        total.value = result.data.total;
    } else {
        console.log("获取数据失败");
    }
};
//点击事件函数位置
//点击修改spu事件
const hadleEdit = (row: any) => {
    scene.value = 1;
    //使用ref获取子组件然后调用器初始化方法
    spu.value.initialSpu(row);
};
//添加Spu按钮事件
const addSpu = (id: any) => {
    //切换场景
    scene.value = 1;
    //调用子组件的初始化函数
    spu.value.initialAddSpu(id);
};
//自定义事件触发
const changeScene = ({ flag, params }) => {
    // 子组件点击取消展示已有的spu
    scene.value = flag;
    //更新数据
    if (params == "update") {
        //更新去往当前页
        getAllSpu();
    } else {
        //添加去往第一页
        getAllSpu();
    }
};
//分页器组件页面尺寸变化的回调
const handleSizeChange = (val: number) => {
    getAllSpu(1, val);
};
//分页器组件页面变化的回调
const handleCurrentChange = (val: number) => {
    getAllSpu(val, pageSize.value);
};
//sku页面的点击事件
const tosku = (row: any) => {
    //将场景切换位sku
    scene.value = 2;
    //获取sku的组件实例调用初始化方法并传入相应的参数
    sku.value.initSku(tempCate.cate1Id, tempCate.cate2Id, row);
};
//点击查看sku列表信息
const showSkuList = async (row: any) => {
    //将展示列表显示出来
    dialogTableVisible.value = true;
    //发送请求获取列表数据
    let result = await reqSkuList(row.id);

    if (result.code == 200) {
        //声明一个变量保存数组
        skuTable.value = result.data;
    }
};
//删除按钮的调用
const handleConfirm = async (id: any) => {
    let result = await reqDelete(id);

    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "成功删除",
        });
        getAllSpu(tableData.length > 1 ? currentPage.value : currentPage.value - 1);
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};

//路由组件销毁的时候清空仓库相关数据
onBeforeUnmount(() => {
    tempCate.$reset();
});
</script>

<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
.spu_box {
    width: 98%;
    margin: 1%;
}
</style>
