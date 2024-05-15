<template>
    <el-card class="card_box">
        <template #header>
            <div class="card-header">
                <!-- 点击事件添加品牌的时候弹出对话框输入数据 -->
                <el-button type="primary" icon="Plus" plain @click="addTradeMark">添加品牌</el-button>
            </div>
        </template>
        <!-- 表格组件 -->
        <el-table :data="tableData" max-height="480px" table-layout="fixed">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column prop="tmName" label="品牌名称" width="280" />
            <el-table-column label="品牌logo" width="280">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image :src="scope.row.logoUrl" style="width: 100px; height: 100px" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <!-- 给编辑按钮就添加修改事件，这里可以调用添加按钮的事件 -->
                    <el-button type="warning" icon="Edit" @click="EditRow(scope.row)">编辑</el-button>
                    <!-- 删除一行的事件 -->
                    <el-popconfirm title="你确定要删除当前数据？" @confirm="handleConfirm(scope.row.id)">
                        <template #reference>
                            <!-- 删除一行的事件 -->
                            <el-button type="danger" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
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
        </template>
    </el-card>

    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="500">
        <el-form :model="form">
            <el-form-item label="品牌名称" :label-width="formLabelWidth" placeholder="请输入品牌名称">
                <el-input v-model="form.tmName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="添加图片" :label-width="formLabelWidth">
                <el-upload
                    action="/api/admin/product/fileUpload"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :before-upload="beforeUpload"
                >
                    <el-icon><Plus /></el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="form.logoUrl" alt="Preview Image" style="width: 100%" />
                </el-dialog>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="DialogCancle">取消</el-button>
                <el-button type="primary" @click="DialogConfirm"> 确认 </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { reqAllTradMark, reqSaveTradMark, reqDeleteTradMark } from "@/api/prod/tradMark/index.ts";
import { ElMessage } from "element-plus";

//公共数据
const dialogTitle = ref("添加品牌"); //用于控制对话框显示隐藏
const pageSize = ref<number>(10); //用于分页组件每一页数据数量
const pageNo = ref<number>(1); //用于控制显示那一页数据
const total = ref<number>(100); //用于接收数据总量数据总量
//如何使用ref来接收数据？
const tableData = ref<any>([]); //用于接收表格数据
const formLabelWidth = "140px"; //用于对话框表格距离控制

//图片链接
const imageUrl = ref<any>("");
const form = ref<any>({
    tmName: "",
    logoUrl: "",
});

//添加成功{
const handleAvatarSuccess = () => {
    ElMessage({
        type: "success",
        message: "添加成功",
    });
};
const beforeAvatarUpload = () => {
    alert("beforAcatarUpload");
};

//请求接口
const getData = async (page = 1, limit = 10) => {
    let result = await reqAllTradMark(page, limit);
    if (result.code == 200) {
        total.value = result.data.total;
        tableData.value = result.data.records;
    } else {
        ElMessage({
            type: "error",
            message: "获取数据失败",
        });
    }
};

//组件加载完成发送申请数据请求
onMounted(() => {
    //调用发送请求的接口
    getData();
});

//数据区域
const dialogVisible = ref(false);
// 点击移除
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles);
};
//点击预览
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
    form.value.logoUrl = uploadFile.url!;
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
//添加品牌事件以及涉及参数
const dialogFormVisible = ref(false); //用于控制对话框显示隐藏
const addTradeMark = () => {
    //清空数据
    Object.assign(form.value, {
        tmName: "",
        logoUrl: "",
    });
    //修改TItle数据
    dialogTitle.value = "添加品牌";
    //显示对话框
    dialogFormVisible.value = true;
};
//修改品牌事件以及涉及参数
const EditRow = (row: any) => {
    form.value.tmName = row.tmName;
    form.value.logoUrl = row.logoUrl;
    console.log(form.value);
    //修改title位编辑品牌
    dialogTitle.value = "编辑品牌";
    //获取当前行的数据
    //显示对话框
    dialogFormVisible.value = true;
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
//删除数据事件
const handleConfirm = async (id: any) => {
    let result = await reqDeleteTradMark(id);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "成功删除",
        });
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};
//对话框点击取消按钮事件
const DialogCancle = () => {
    dialogFormVisible.value = false;
};
//对话框确认按钮事件
const DialogConfirm = async () => {
    // 确认获取数据发送请求
    let result = await reqSaveTradMark(form);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "添加成功",
        });
        getData(pageNo.value, pageSize.value);
    } else {
        ElMessage({
            type: "error",
            message: "添加失败",
        });
    }
};
</script>

<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
.card_box {
    width: 98%;
    margin: 1% 0;
}
.el-table-column {
    height: 100px;
}
</style>
