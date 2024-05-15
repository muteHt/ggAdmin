<template>
    <div class="manu_box">
        <el-card>
            <el-table :data="tableData" border style="width: 100%" row-key="id">
                <el-table-column label="名称" prop="name" />
                <el-table-column label="权限" prop="code" />
                <el-table-column label="修改时间" prop="updateTime" />
                <!-- 按钮数据 -->
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" size="small" :disabled="scope.row.level == 4 ? true : false" @click="handleAdd(scope.row)"> 添加菜单 </el-button>
                        <el-button type="primary" size="small" :disabled="scope.row.level == 1 ? true : false" @click="handleEdit(scope.row)"> 编辑 </el-button>
                        <el-popconfirm :title="`你确定删除${scope.row.name}吗?`" @confirm="handleRemove(scope.row)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 用于添加的dialog -->
            <el-dialog v-model="dialogVisible" :title="formParams.id ? '更新菜单' : '添加菜单'" width="500">
                <!-- 表单组件用于接收数据 -->
                <el-form>
                    <el-form-item label="名称">
                        <el-input type="text" placeholder="请输入名称" v-model="formParams.name"></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-input type="text" placeholder="请输入权限" v-model="formParams.code"> </el-input>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="handleConfirm">确认 </el-button>
                    </div>
                </template>
            </el-dialog>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { reqManu, reqRemove, reqADDORUPDATE } from "../../../api/manu";
import { ElMessage } from "element-plus";

//存储数据
const tableData = ref<any>([]);
//用于控制显示隐藏
const dialogVisible = ref<any>(false);
//用于接收添加的参数
const formParams = reactive<any>({
    code: "",
    level: 0,
    name: "",
    pid: 0,
});
//点击添加菜单弹出对话框
const handleAdd = (row) => {
    // 清空数组
    Object.assign(formParams, {
        code: "",
        level: 0,
        name: "",
        pid: 0,
    });

    formParams.level = row.level + 1;
    formParams.pid = row.id;
    //控制显示隐藏
    dialogVisible.value = true;
};
//点击编辑按钮的回调
const handleEdit = (row: any) => {
    formParams.id = row.id;
    formParams.name = row.name;
    formParams.code = row.code;
    formParams.toCode = row.code;
    formParams.level = row.level;
    dialogVisible.value = true;
};
//点击删除按钮的回调
const handleRemove = async (row: any) => {
    let result = await reqRemove(row.id);

    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        dialogVisible.value = false;
        getData();
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};
//点击确认的回调
const handleConfirm = async () => {
    formParams.toCode = formParams.code;
    //发送请求
    let result = await reqADDORUPDATE(formParams);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: formParams.id ? "更新成功" : "添加成功",
        });
        dialogVisible.value = false;
        getData();
    } else {
        ElMessage({
            type: "error",
            message: formParams.id ? "更新失败" : "添加失败",
        });
    }
};
//获取数据的函数
const getData = async () => {
    let result = await reqManu();
    if (result.code == 200) {
        tableData.value = result.data;
    }
};

onMounted(() => {
    getData();
});
</script>

<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
.manu_box {
    width: 98%;
    margin: 1%;
}
</style>
