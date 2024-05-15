<template>
    <div class="role_box">
        <el-card>
            <el-form class="el_form_role">
                <el-form-item label="用户名">
                    <el-input type="text" placeholder="请输入搜索角色名" v-model="searchName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="searchName ? false : true" @click="handleSearch"> 搜索 </el-button>
                    <el-button type="primary" @click="reset"> 重置 </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin: 10px 0">
            <template #header>
                <div>
                    <el-button type="primary" @click="addRole">增加角色</el-button>
                    <el-button type="danger" @click="batchDelete" :disabled="deleteList.length > 0 ? false : true">批量删除</el-button>
                </div>
            </template>
            <el-table style="margin: 10px 0px" border :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column show-overflow-tooltip align="center" type="selection"> </el-table-column>
                <el-table-column show-overflow-tooltip align="center" label="#" type="index"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="id" align="center" label="ID"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="roleName" align="center" label="角色名称"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="createTime" align="center" label="创建时间"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="updateTime" align="center" label="更新时间"> </el-table-column>
                <el-table-column show-overflow-tooltip align="center" label="操作" width="280">
                    <template #default="scope">
                        <el-button type="primary" size="small" icon="User" @click="handleRole(scope.row)">分配权限</el-button>
                        <el-button type="warning" size="small" icon="Edit" @click="updateRole(scope.row)">编辑</el-button>
                        <el-popconfirm :title="`你确定删除${scope.row.roleName}吗?`" @confirm="deleteRole(scope.row.id)">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器组件 -->
            <el-pagination
                :current-page="pageNo"
                :page-size="pageSize"
                :page-sizes="[10, 20, 30, 40]"
                layout="prev,pager, next,->,sizes,total,jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </el-card>
        <!-- 用户添加角色 -->
        <el-dialog v-model="dialogFormVisible" :title="addform.id ? '更新角色' : '添加角色'" width="600">
            <el-form :model="addform" :rules="rules" ref="formRef">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input autocomplete="off" v-model="addform.roleName" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleCacle">取消</el-button>
                    <el-button type="primary" @click="handleComfirm">确认</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 用于分配权限-->
        <el-drawer v-model="drawer">
            <template #header>
                <h4>分配权限</h4>
            </template>
            <el-tree
                ref="tree"
                style="max-width: 600px"
                :data="TreeData"
                show-checkbox
                default-expand-all
                node-key="id"
                :default-checked-keys="selectArr(TreeData, permissionIdList)"
                :props="defaultProps"
            />
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="handleCancleDrawer">取消</el-button>
                    <el-button type="primary" @click="handleConfirmDrawer">确认</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from "vue";
import { ElMessage } from "element-plus";
import { settingStore } from "@/store/setting.ts";
import { reqRoleList, reqUpdateOrAdd, reqDeleteRole, reqBatchDelete } from "@/api/role";
import { reqManuByRole, reqAssignPermission } from "@/api/manu";

//树形组件数据
const TreeData = ref([]);
const defaultProps = ref({
    children: "children",
    label: "name",
});
const Params = ref({});
const tree = ref({});
const permissionIdList = ref([]);
const useStore = settingStore();
//数据区域
const tableData = ref<any>([]);
//分页器页码
const pageNo = ref<number>(1);
//分页器页码容量
const pageSize = ref<number>(10);
//数据总量
const total = ref<number>(10);
//对话框显示
const dialogFormVisible = ref<any>(false);
//存储用户表单数据
const addform = ref<any>({});
//搜索关键字
const searchName = ref<any>("");
const formData = ref<any>({});
const formRef = ref<any>({});
//控制抽屉显示
const drawer = ref<any>(false);
//选中的数组
const selectArr = (TreeData: any, initArr: any) => {
    TreeData.forEach((item: any) => {
        if (item.select && item.level == 4) {
            initArr.push(item.id);
        }
        if (item.children && item.children.length > 0) {
            selectArr(item.children, initArr);
        }
    });

    return initArr;
};
//分配权限事件

const handleRole = async (row) => {
    //切换抽屉
    drawer.value = true;
    Params.value.roleId = row.id;
    permissionIdList.value = [];
    let result = await reqManuByRole(row.id);
    if (result.code == 200) {
        TreeData.value = result.data;
    }
};

//添加角色
const addRole = () => {
    Object.assign(addform.value, { roleName: "" });
    //切换位显示
    dialogFormVisible.value = true;
    nextTick(() => {
        formRef.value.clearValidate();
    });
};
//更新角色信息
const updateRole = (row: any) => {
    addform.value.id = row.id;
    addform.value.roleName = row.roleName;
    //切换位显示
    dialogFormVisible.value = true;
};
//校验规则
const checkRoleName = (rule: any, value: any, callback: any) => {
    if (value.trim().length < 2) {
        callback(new Error("职位名称必须大于两位"));
    } else {
        callback();
    }
};
const rules = reactive({
    roleName: [{ required: true, trigger: "change", validator: checkRoleName }],
});
//取消添加
const handleCacle = () => {
    dialogFormVisible.value = false;
};
//确认添加或修改
const handleComfirm = async () => {
    await formRef.value.validate();
    let result = await reqUpdateOrAdd(addform.value);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: addform.value.id ? "更新成功" : "添加成功",
        });
        getRoleData(pageNo.value, pageSize.value);
    } else {
        ElMessage({
            type: "error",
            message: addform.value.id ? "更新失败" : "添加失败",
        });
    }
    dialogFormVisible.value = false;
};
//点击删除角色
const deleteList = ref<any>([]);
const handleSelectionChange = (val) => {
    deleteList.value = val.map((item: any) => item.id);
};
const deleteRole = async (id: any) => {
    let result = await reqDeleteRole(id);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        getRoleData();
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};
const batchDelete = async () => {
    let result = await reqBatchDelete(deleteList.value);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "删除成功",
        });
        getRoleData();
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};
//搜索事件
const handleSearch = () => {
    getRoleData();
    searchName.value = "";
};
//重置事件
const reset = () => {
    useStore.refresh = !useStore.refresh;
};

//分页器处理事件
const handleCurrentChange = (val: any) => {
    //调用获取数据函数
    pageNo.value = val;
    getRoleData(pageNo.value, pageSize.value);
};
const handleSizeChange = (val: any) => {
    //调用获取数据函数
    pageSize.value = val;
    getRoleData(pageNo.value, pageSize.value);
};
//数据获取发送请求
const getRoleData = async (page = 1, limit = 10) => {
    let result = await reqRoleList(page, limit, searchName.value);
    if (result.code == 200) {
        tableData.value = result.data.records;
        total.value = result.data.total;
    }
};
//分配角色的逻辑
const handleCancleDrawer = () => {
    //切换出抽屉
    drawer.value = false;
};
const handleConfirmDrawer = async () => {
    let arr1 = tree.value.getHalfCheckedKeys();
    let arr2 = tree.value.getCheckedKeys();
    arr1.concat(arr2);
    let result = await reqAssignPermission(Params.value.roleId, arr1);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "分配成功",
        });
        drawer.value = false;
        getRoleData(pageNo.value, pageSize.value);
        window.location.reload();
    } else {
        ElMessage({
            type: "error",
            message: "分配失败",
        });
    }
};

onMounted(() => {
    //挂载的时候获去用户数据
    getRoleData();
});
</script>

<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
.el_form_role {
    display: flex;
    justify-content: space-between;
    //align-items: center;
}
.role_box {
    width: 98%;
    margin: 1%;
}
</style>
