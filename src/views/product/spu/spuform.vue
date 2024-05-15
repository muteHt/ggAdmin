<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input placeholder="请你输入SPU名称" style="width: 280px" v-model="tableFrom.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
            <el-select style="width: 280px" v-model="tableFrom.tmId">
                <el-option v-for="item in TradMarkList" :key="item.id" :label="item.tmName" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
            <el-input type="textarea" placeholder="请输入描述" v-model="tableFrom.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
            <el-upload
                v-model:file-list="imageList"
                action="/api/admin/product/fileUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
            >
                <el-icon><Plus /></el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select style="width: 280px" :placeholder="unSelectAttr.length > 0 ? `还未选择${unSelectAttr.length}个` : '无'" v-model="saleAttrAndValueName">
                <el-option :value="`${item.id}:${item.name}`" v-for="item in unSelectAttr" :label="item.name" :key="item.id"></el-option>
            </el-select>
            <el-button :disabled="unSelectAttr.length > 0 ? false : true" @click="addSaleAttr" style="margin-left: 10px" type="primary" size="default" icon="Plus"
                >添加属性</el-button
            >
        </el-form-item>
        <el-form-item>
            <el-table :data="saleAttr">
                <el-table-column label="序号" type="index" width="180"> </el-table-column>
                <el-table-column label="销售属性名称" width="180" prop="saleAttrName"> </el-table-column>
                <el-table-column label="销售属性值" width="380">
                    <template #default="scope">
                        <el-tag
                            style="margin: 0 5px"
                            v-for="item in scope.row.spuSaleAttrValueList"
                            :key="scope.id"
                            closable
                            @close="scope.row.spuSaleAttrValueList.splice(scope.index, 1)"
                            >{{ item.saleAttrValueName }}
                        </el-tag>
                        <input
                            v-if="scope.row.flag == true"
                            v-model="scope.row.SaleAttrValue"
                            type="text"
                            name=""
                            @blur="toLook(scope.row)"
                            placeholder="请输入属性值"
                            size="small"
                            style="width: 100px"
                        />
                        <el-button v-else icon="Plus" @click="toEdit(scope.row)" size="small"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template #default="scope">
                        <el-button type="danger" @click="saleAttr.splice(scope.$index, 1)" icon="delete"> 删除 </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="primary" @click="cancleScene">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import { ref, defineExpose, computed } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type UploadProps } from "element-plus";
import { reqSpuHasSaleAttr, reqSpuImageList, reqAllTradMark, reqALLSaleAttr, reqSaveOrUpdate } from "@/api/prod/spu/index.ts";
let $emit = defineEmits(["changeScene"]);
//数据区域
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
//用于存储销售属性id和值名称的数据
let saleAttrAndValueName = ref();
// 点击移除
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles);
};
//点击预览
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!;
    dialogVisible.value = true;
};
//上传之前
const beforeUpload = (file: any) => {
    if (file.type == "image/png" || file.type == "image/jpg" || file.type == "image/gif" || file.type == "image/jpeg") {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: "error",
                message: "图片必须小于3M",
            });
            return false;
        }
    } else {
        ElMessage({
            type: "error",
            message: "文件必须为图片",
        });
        return false;
    }
};
//计算属性

const unSelectAttr = computed(() => {
    //全部销售属性
    //
    let unSelectArr = allSaleAttr.value.filter((item: any) => {
        return saleAttr.value.every((item1: any) => {
            return item.name != item1.saleAttrName;
        });
    });
    return unSelectArr;
});

//点击事件
const cancleScene = () => {
    $emit("changeScene", { flag: 0, params: "update" });
};
//点击添加销售属性的方法
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrAndValueName.value.split(":");
    let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValue: [],
    };
    //追加到数组中
    saleAttr.value.push(newSaleAttr);
    //清空数据
    saleAttrAndValueName.value = "";
};
//点击保存按钮的形式
const handleSave = async () => {
    //整理参数
    // 整理照片墙参数
    tableFrom.value.spuImageList = imageList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url,
        };
    });
    //整理销售属性
    tableFrom.value.spuSaleAttrList = saleAttr.value;
    //发送请求
    let result = await reqSaveOrUpdate(tableFrom.value);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: tableFrom.value.id ? "更新成功" : "添加成功",
        });
        //通知父组件切换场景
        $emit("changeScene", { flag: 0, params: tableFrom.value.id ? "update" : "add" });
    } else {
        ElMessage({
            type: "error",
            message: tableFrom.value.id ? "更新失败" : "添加失败",
        });
    }
};
//进入编辑模式
const toEdit = (row) => {
    //将当前行的flag置为true
    row.flag = true;
    //将当前行的销售属性值清空
    row.SaleAttrValue = "";
};
//点击添加属性按钮可以对属性值进行添加
const toLook = (row: any) => {
    //整理收集的属性id和属性值名称
    let { baseSaleAttrId, SaleAttrValue } = row;
    //整理成服务器值的形式
    let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: SaleAttrValue as string,
    };
    //非法情况判断

    //属性值不能位空
    if (SaleAttrValue.trim() == "") {
        ElMessage({
            type: "error",
            message: "属性值不能为空",
        });
        return;
    }
    //判断属性值是否为空
    if (!row.spuSaleAttrValueList) {
        row.spuSaleAttrValueList = [];
    }
    const repet = row.spuSaleAttrValueList.find((item: any) => {
        return item.saleAttrValueName == SaleAttrValue;
    });
    if (repet == true) {
        ElMessage({
            type: "error",
            message: "属性值不能为空",
        });
        return;
    }
    //追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue);

    //切换查看模式
    row.flag = false;
};

//存储相应的数据
const TradMarkList = ref<any>([]);
const imageList = ref<any>([]);
const allSaleAttr = ref<any>([]);
const saleAttr = ref<any>([]);
const tableFrom = ref<any>({
    //存储已有的spu对象
    category3Id: "", //三级分类id
    spuName: "", //spu名字
    description: "", //spu描述
    tmId: "", //品牌id
    spuImageList: [], //图片数组
    spuSaleAttrList: [], //销售属性
});
//初始化组件事件
const initialSpu = async (row: any) => {
    //调用获取参数数据的接口获取数据
    //获取全部品牌数据
    tableFrom.value = row;
    let result1: any = await reqAllTradMark();
    if (result1.code == 200) {
        TradMarkList.value = result1.data;
    }
    //获取到所有的某一个品牌下售卖商品的图片
    let result2: any = await reqSpuImageList(row.id);
    if (result2.code == 200) {
        imageList.value = result2.data.map((item: any) => {
            return { name: item.imgName, url: item.imgUrl };
        });
    }
    // //获取所有的销售属性
    let result3: any = await reqALLSaleAttr(row.id);
    if (result3.code == 200) {
        allSaleAttr.value = result3.data;
    }
    // // 获取某一个销售属性
    let result4: any = await reqSpuHasSaleAttr(row.id);
    if (result4.code == 200) {
        saleAttr.value = result4.data;
    }
};
const initialAddSpu = async (cate3Id) => {
    //清空数据
    //清空表单
    Object.assign(tableFrom.value, {
        //存储已有的spu对象
        category3Id: "", //三级分类id
        spuName: "", //spu名字
        description: "", //spu描述
        tmId: "", //品牌id
        spuImageList: [], //图片数组
        spuSaleAttrList: [], //销售属性
    });
    //清空照片墙
    imageList.value = [];
    //清空销售属性
    saleAttr.value = [];
    //清空接收属性
    saleAttrAndValueName.value = "";
    //存储三级id
    tableFrom.value.category3Id = cate3Id;
    //获取所有的品牌属性
    let result1: any = await reqAllTradMark();
    if (result1.code == 200) {
        TradMarkList.value = result1.data;
    }
    //获取所有的销售属性
    let result2: any = await reqALLSaleAttr(cate3Id);
    if (result2.code == 200) {
        allSaleAttr.value = result2.data;
    }
};

//对外暴露初始化组件去
defineExpose({ initialSpu, initialAddSpu });
</script>

<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
</style>
