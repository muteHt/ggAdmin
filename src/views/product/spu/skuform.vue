<template>
    <div>
        <el-form label-width="100px">
            <el-form-item label="SKU名称">
                <el-input placeholder="请你输入SKU名称" style="width: 280px" v-model="formParams.skuName"></el-input>
            </el-form-item>
            <el-form-item label="价格（元）">
                <el-input placeholder="价格（元）" style="width: 280px" v-model="formParams.price"></el-input>
            </el-form-item>
            <el-form-item label="重量（克）">
                <el-input placeholder="重量（克）" style="width: 280px" v-model="formParams.weight"></el-input>
            </el-form-item>
            <el-form-item label="sku描述">
                <el-input placeholder="sku描述" type="textarea" style="width: 280px" v-model="formParams.skuDesc"></el-input>
            </el-form-item>
            <el-form-item label="平台属性">
                <el-form :inline="true" label-width="100px">
                    <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
                        <el-select v-model="item.attrIdAndValueId" style="width: 180px; margin: 5px">
                            <el-option :value="`${item.id}:${item1.id}`" v-for="item1 in item.attrValueList" :key="item1.id" :label="item1.valueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-form :inline="true" label-width="100px">
                    <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
                        <el-select v-model="item.saleIdAndValueId" style="width: 180px; margin: 5px">
                            <el-option :value="`${item.id}:${item1.id}`" v-for="item1 in item.spuSaleAttrValueList" :key="item1.id" :label="item1.saleAttrValueName"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="图片名称">
                <el-table :data="imageArr" max-height="300px" ref="table">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column label="图片" width="180">
                        <template #default="scope">
                            <div style="display: flex; align-items: center">
                                <el-image :src="scope.row.imgUrl" style="width: 100px; height: 100px" />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" width="380" prop="imgName"></el-table-column>
                    <el-table-column label="操作" width="180">
                        <template #default="scope">
                            <el-button type="primary" @click="handleDefault(scope.row)">设置默认值</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSave">保存</el-button>
                <el-button type="primary" @click="handleCancle">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
//导入需要的数据api
import { reqAttr } from "../../../api/prod/attr";
import { reqSpuImageList, reqSpuHasSaleAttr } from "../../../api/prod/spu";
import { reqAddSku } from "../../../api/prod/sku";
import { tableV2CellProps } from "element-plus/es/components/table-v2/src/cell.mjs";
import { ElMessage } from "element-plus";
//定义相应的数据
const table = ref<any>();
const formParams = ref<any>({
    category3Id: 0, //存储类别id
    price: 0, //存储价格
    skuAttrValueList: [],
    skuDefaultImg: "", //默认图片
    skuDesc: "", //sku描述
    skuImageList: [
        //图片数组
        {
            id: 0,
            imgName: "",
            imgUrl: "",
            isDefault: "",
            skuId: 0,
            spuImgId: 0,
        },
    ],
    skuName: "", //sku名称
    skuSaleAttrValueList: [],
    spuId: 0,
    tmId: 0,
    weight: "",
});
//平台属性数组
const attrArr = ref<any>([]);
//销售属性数组
const saleArr = ref<any>([]);
//图片数组
const imageArr = ref<any>([]);
//填写相应的获取数据的函数
//在合适的时候调用获取数据函数
//组件初始化
const initSku = async (cate1I: any, cate2Id: any, row: any) => {
    //清空数据
    Object.assign(formParams.value, {
        category3Id: 0, //存储类别id
        price: 0, //存储价格
        skuAttrValueList: [],
        skuDefaultImg: "", //默认图片
        skuDesc: "", //sku描述
        skuImageList: [
            //图片数组
            {
                id: 0,
                imgName: "",
                imgUrl: "",
                isDefault: "",
                skuId: 0,
                spuImgId: 0,
            },
        ],
        skuName: "", //sku名称
        skuSaleAttrValueList: [],
        spuId: 0,
        tmId: 0,
        weight: "",
    });
    imageArr.value = [];
    saleArr.value = [];
    attrArr.value = [];

    formParams.value.category3Id = row.category3Id;
    formParams.value.tmId = row.tmId;
    formParams.value.spuId = row.id;
    //根据类别id来获取类别调用接口获取数据
    let result1 = await reqAttr(cate1Id, cate2Id, row.category3Id);
    //根据spuid获取对应的销售属性
    let result2 = await reqSpuHasSaleAttr(row.id);
    //获取照片墙的数据
    let result3 = await reqSpuImageList(row.id);
    attrArr.value = result1.data;
    saleArr.value = result2.data;
    imageArr.value = result3.data;
};
defineExpose({ initSku });
//点击事件
const handleDefault = (row: any) => {
    //将tableselection置为false
    table.value.clearSelection();
    table.value.toggleRowSelection(row, true);

    //将当前图片的url设置位默认url
    formParams.value.skuDefaultImg = row.imgUrl;
};

//点击保存
const handleSave = async () => {
    //整理参数
    //整理属性id
    formParams.value.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [AttrId, AttrValueId] = next.attrIdAndValueId.split(":");

            prev.push({
                AttrId,
                AttrValueId,
            });
        }
        return prev;
    }, []);

    //整理销售属性id
    formParams.value.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(":");

            prev.push({
                saleAttrId,
                saleAttrValueId,
            });
        }
        return prev;
    }, []);
    //发送请求

    let result = await reqAddSku(formParams);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "添加成功",
        });
        //进行跳转
        $emit("changeScene", { flag: 0, params: "" });
    } else {
        ElMessage({
            type: "error",
            message: "添加失败",
        });
    }
};

//定义父组件的回调
let $emit = defineEmits(["changeScene"]);
//取按钮的回调
const handleCancle = () => {
    $emit("changeScene", { flag: 0, params: "" });
};
</script>
<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
</style>
