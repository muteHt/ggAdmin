<template>
    <div class="sku_box">
        <el-card style="margin: 10px 0">
            <el-table :data="tableData" max-height="600px" ref="table">
                <el-table-column type="index" width="80" label="序号"> </el-table-column>
                <el-table-column label="名称" show-overflow-tooltip width="150" prop="skuName"></el-table-column>
                <el-table-column label="描述" show-overflow-tooltip width="280" prop="skuDesc"></el-table-column>

                <el-table-column label="默认图片" width="180">
                    <template #default="scope">
                        <div style="display: flex; align-items: center">
                            <el-image :src="scope.row.skuDefaultImg" style="width: 100px; height: 100px" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="重量" width="280" prop="weight"></el-table-column>
                <el-table-column label="价格" width="280" prop="price"></el-table-column>
                <el-table-column label="操作" width="380" fixed="right">
                    <template #default="scope">
                        <el-button :type="scope.row.isSale == 1 ? 'success' : 'info'" :icon="scope.row.isSale == 0 ? 'top' : 'bottom'" @click="updateSale(scope.row)">{{
                            scope.row.isSale == 0 ? "上架" : "下架"
                        }}</el-button>
                        <el-button type="primary" icon="Edit" @click="handleEdit">编辑</el-button>
                        <el-button type="warning" icon="view" @click="toShow(scope.row)">查看</el-button>
                        <el-popconfirm title="你确定要删除当前数据？" @confirm="handleConfirm(scope.row)">
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
                :current-page="pageNo"
                :page-size="pageSize"
                :page-sizes="[10, 15, 20, 25]"
                layout="prev,pager,next,->,sizes,total,jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </el-card>
        <el-drawer v-model="visible" :show-close="false">
            <template #header="{ close, titleId, titleClass }">
                <h4 :id="titleId" :class="titleClass">商品详情页</h4>
                <el-button type="danger" @click="close">
                    <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
                </el-button>
            </template>
            <template #default>
                <el-row style="margin: 10px 0px">
                    <el-col :span="6"> 商品名称： </el-col>
                    <el-col :span="18"> {{ SkuInfo.skuName }} </el-col>
                </el-row>
                <el-row style="margin: 10px 0px">
                    <el-col :span="6"> 商品描述 </el-col>
                    <el-col :span="18">{{ SkuInfo.skuDesc }} </el-col>
                </el-row>
                <el-row style="margin: 10px 0px">
                    <el-col :span="6"> 商品价格： </el-col>
                    <el-col :span="18"> {{ SkuInfo.price }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0px">
                    <el-col :span="6"> 平台属性： </el-col>
                    <el-col :span="18">
                        <el-tag style="margin: 5px" v-for="item in SkuInfo.skuAttrValueList">{{ item.valueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0px">
                    <el-col :span="6"> 商品属性： </el-col>
                    <el-col :span="18">
                        <el-tag style="margin: 5px" v-for="item in SkuInfo.skuSaleAttrValueList">{{ item.saleAttrValueName }}</el-tag>
                    </el-col>
                </el-row>
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in SkuInfo.skuImageList" :key="item.id">
                        <el-image :src="item.imgUrl" alt="#" style="width: 100%" />
                    </el-carousel-item>
                </el-carousel>
            </template>
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { reqSkuData, reqCancleSale, reqSkuIsSale, reqSkuInfo, reqDelete } from "../../../api/prod/sku";
import { ElMessage } from "element-plus";
//数据表的数据
const tableData = ref<any>([]);
//分页器总数
const total = ref<number>(10);
//当前页码
const pageNo = ref<number>(1);
//页面尺寸
const pageSize = ref<number>(10);
//控制抽屉的显示隐藏
const visible = ref(false);
//用于接收商品详情页面的数据
const SkuInfo = ref<any>({
    skuName: "",
});
//获取数据函数
const getData = async (page = 1, limit = 10) => {
    let result = await reqSkuData(page, limit);
    if (result.code == 200) {
        tableData.value = result.data.records;
        total.value = result.data.total;
    }
};
//分页器点击事件
const handleCurrentChange = (val: any) => {
    pageNo.value = val;
    getData(pageNo.value, pageSize.value);
};
const handleSizeChange = (val: any) => {
    pageSize.value = val;
    getData(pageNo.value, pageSize.value);
};
//更新销售状态
const updateSale = async (row: any) => {
    if (row.isSale == 0) {
        let result = await reqSkuIsSale(row.id);
        if (result.code == 200) {
            ElMessage({
                type: "success",
                message: "上架成功",
            });
        } else {
            ElMessage({
                type: "error",
                message: "上架失败",
            });
        }
    } else {
        let result = await reqCancleSale(row.id);
        if (result.code == 200) {
            ElMessage({
                type: "success",
                message: "下架成功",
            });
        } else {
            ElMessage({
                type: "error",
                message: "下架失败",
            });
        }
    }
    //跟新数据
    getData(pageNo.value, pageSize.value);
};
//点击编辑
const handleEdit = () => {
    ElMessage({
        type: "success",
        message: "功能还在开发中",
    });
};
//点击查看sku详情
const toShow = async (row) => {
    //显示抽屉
    visible.value = true;
    //使用skuid获取详情页数据
    let result = await reqSkuInfo(row.id);
    if (result.code == 200) {
        SkuInfo.value = result.data;
    }
};

//点击删除对应的sku
const handleConfirm = async (row: any) => {
    let result = await reqDelete(row.id);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "成功删除",
        });
        //删除成功重新获取数据
        getData(tableData.value.length > 1 ? pageNo.value : pageNo.value - 1, pageSize.value);
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};

onMounted(() => {
    // 请求数据
    getData(1, pageSize.value);
});
</script>
<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
.sku_box {
    width: 98%;
    height: 1%;
}
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
