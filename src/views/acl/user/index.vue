<template>
    <div class="user_box">
        <el-card>
            <el-form class="el_form_user">
                <el-form-item label="用户名">
                    <el-input type="text" placeholder="请输入搜索用户名" v-model="searchName"></el-input>
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
                    <el-button type="primary" @click="addUser">增加用户</el-button>
                    <el-button type="danger" @click="batchDelete" :disabled="deleteList.length > 0 ? false : true">批量删除</el-button>
                </div>
            </template>
            <el-table style="margin: 10px 0px" border :data="tableData" @selection-change="handleSelectionChange">
                <el-table-column show-overflow-tooltip align="center" type="selection"> </el-table-column>
                <el-table-column show-overflow-tooltip align="center" label="#" type="index"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="id" align="center" label="ID"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="username" align="center" label="用户名称"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="roleName" align="center" label="用户角色"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="createTime" align="center" label="创建时间"> </el-table-column>
                <el-table-column show-overflow-tooltip prop="updateTime" align="center" label="更新时间"> </el-table-column>
                <el-table-column show-overflow-tooltip align="center" label="操作" width="280">
                    <template #default="scope">
                        <el-button type="primary" size="small" icon="User" @click="handleRole(scope.row)">分配角色</el-button>
                        <el-button type="warning" size="small" icon="Edit" @click="updateUser(scope.row)">编辑</el-button>
                        <el-popconfirm :title="`你确定删除${scope.row.username}吗?`" @confirm="deleteUser(scope.row.id)">
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
        <!--抽屉组件用于添加和更新-->
        <el-drawer v-model="drawer" :show-close="false">
            <template #header="{ close }">
                <h4>{{ formData.id ? "更新用户" : "添加用户" }}</h4>
                <el-button type="danger" @click="cancelClick">
                    <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
                </el-button>
            </template>
            <el-form :model="formData" :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input type="text" placeholder="请输入用户名称" v-model="formData.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name" v-show="formData.id ? false : true">
                    <el-input type="text" placeholder="请输入用户昵称" v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input type="text" placeholder="请输入用户密码" v-model="formData.password"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancelClick">取消</el-button>
                    <el-button type="primary" @click="save">确认</el-button>
                </div>
            </template>
        </el-drawer>
        <!-- 用于分配角色 -->
        <el-drawer v-model="drawer2">
            <template #header>
                <h4>分配角色</h4>
            </template>
            <el-form :model="formData2">
                <el-form-item label="用户姓名">
                    <el-input type="text" disabled="true" :value="formData2.username"></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="role in allRole" :key="role.id" :label="role.roleName" :value="role">{{ role.roleName }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="handleCancleDrawer2">取消</el-button>
                    <el-button type="primary" @click="handleConfirmDrawer2">确认</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from "vue";
import { reqUserInfo, reqUserList, reqAddOrUpdate, reqAllRole, reqAssignRole, reqDelete, reqBachDelete } from "../../../api/user";
import { ElMessage } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { settingStore } from "@/store/setting.ts";

const useStore = settingStore();

//数据区域
const tableData = ref<any>([]);
//分页器页码
const pageNo = ref<number>(1);
//分页器页码容量
const pageSize = ref<number>(10);
//数据总量
const total = ref<number>(10);
//抽屉显示
const drawer = ref<any>(false);
//存储用户表单数据
const formData = ref<any>({
    username: "",
    name: "",
    password: "",
});
const formRef = ref<any>();
//添加用户
const addUser = () => {
    formData.value = {};
    //切换位显示
    drawer.value = true;
    nextTick(() => {
        formRef.value.clearValidate();
    });
};
//更新用户
const updateUser = (row: any) => {
    formData.value = row;
    //切换为显示
    drawer.value = true;
    nextTick(() => {
        formRef.value.clearValidate();
    });
};
//取消添加
const cancelClick = () => {
    drawer.value = false;
};
//点击删除用户
const deleteUser = async (id) => {
    let result = await reqDelete(id);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "删除用户成功",
        });
        getUserData(pageNo.value, pageSize.value);
    } else {
        ElMessage({
            type: "error",
            message: "删除用户失败",
        });
    }
};
const deleteList = ref<any>([]);
const handleSelectionChange = (val) => {
    deleteList.value = val.map((item) => item.id);
};
//点击批量删除用户
const batchDelete = async () => {
    //整理删除数据
    let result = await reqBachDelete(deleteList.value);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "删除用户成功",
        });
        getUserData(pageNo.value, pageSize.value);
    } else {
        ElMessage({
            type: "error",
            message: "删除用户失败",
        });
    }
};
//确认添加
const save = async () => {
    //等待表单验证通过

    await formRef.value.validate();

    //对数据进行验证
    let result = await reqAddOrUpdate(formData.value);

    if (result.code == 200) {
        drawer.value = false;
        ElMessage({
            type: "success",
            message: formData.value.id ? "更新成功" : "添加成功",
        });
        //重新获取数据
        getUserData(formData.value.di ? pageNo.value : 1, pageSize.value);
        //浏览器重新加载
        window.location.reload();
    } else {
        ElMessage({
            type: "error",
            message: formData.value.id ? "更新失败" : "添加失败",
        });
    }
};

//搜索事件
const handleSearch = () => {
    getUserData();
    searchName.value = "";
};
//重置事件
const reset = () => {
    useStore.refresh = !useStore.refresh;
    alert("done");
};

//分页器处理事件
const handleCurrentChange = (val) => {
    //调用获取数据函数
    pageNo.value = val;
    getUserData(pageNo.value, pageSize.value);
};
const handleSizeChange = (val) => {
    //调用获取数据函数
    pageSize.value = val;
    getUserData(pageNo.value, pageSize.value);
};
//数据获取发送请求
const getUserData = async (page = 1, limit = 5) => {
    let result = await reqUserList(page, limit, searchName.value);

    if (result.code == 200) {
        tableData.value = result.data.records;
        total.value = result.data.total;
    }
};
const getRoles = async (userid) => {
    let result = await reqAllRole(userid);

    if (result.code == 200) {
        allRole.value = result.data.allRolesList;
        checkedRoles.value = result.data.assignRoles;
    } else {
        ElMessage({
            type: "error",
            message: "获取数据失败",
        });
    }
};
//username校验规则
const validateUsername = (rule, value, callback) => {
    if (!value) {
        callback(new Error("用户名不能为空"));
    }
    if (value.trim().length >= 5) {
        callback();
    } else {
        callback(new Error("用户名昵称至少为五位"));
    }
};
//name校验规则
const validateName = (rule, value, callback) => {
    if (!value) {
        callback(new Error("用户名不能为空"));
    }
    if (value.trim().length >= 5) {
        callback();
    } else {
        callback(new Error("用户名至少为五位"));
    }
};
//password校验规则
const validatePass = (rule, value, callback) => {
    if (!value) {
        callback(new Error("密码不能为空"));
    }
    if (value.trim().length >= 6) {
        callback();
    } else {
        callback(new Error("用户密码至少为六位"));
    }
};
//表单校验规则
const rules = reactive({
    username: [{ required: true, trigger: "blur", validator: validateUsername }],
    password: [{ required: true, trigger: "blur", validator: validatePass }],
    name: [{ required: true, trigger: "blur", validator: validateName }],
});
//分配角色的逻辑
const handleRole = (row) => {
    //切换出抽屉
    drawer2.value = true;
    formData2.value.username = row.username;
    formData2.value.userId = row.id;
    //获取数据
    getRoles(row.id);
};
const handleCancleDrawer2 = () => {
    //切换出抽屉
    drawer2.value = false;
};
const handleConfirmDrawer2 = async () => {
    // 整理数据
    // formData2.value.roleIdList = checkedRoles.value.reduce((prev, cur) => {
    //     prev.push(cur.id);
    //     return prev;
    // }, []);
    let data = {
        roleIdList: checkedRoles.value.map((item) => item.id),
        userId: formData2.value.userId,
    };
    console.log(data);

    //发送更改请求
    let result = await reqAssignRole(data);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "分配成功",
        });
        //切换出抽屉
        drawer2.value = false;
        //刷新数据
        getUserData(pageNo.value, pageSize.value);
    } else {
        ElMessage({
            type: "error",
            message: "分配失败",
        });
    }
};
//全选逻辑

//用于接收分配角色的数据
const formData2 = ref({});
//用于控制抽屉2的显示与隐藏
const drawer2 = ref(false);
//全选按钮
const checkAll = ref(false);
const isIndeterminate = ref(true);
//勾选的数组
const checkedRoles = ref<any>([]);
//用于存储所有角色的数组
const allRole = ref<any>([]);
//用于搜索使用的参数
const searchName = ref<any>("");
const handleCheckAllChange = (val: boolean) => {
    checkedRoles.value = val ? allRole.value : [];
    isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length;
    checkAll.value = checkedCount === allRole.value.length;
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length;
};

onMounted(() => {
    //挂载的时候获去用户数据
    getUserData();
});
</script>

<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
.el_form_user {
    display: flex;
    justify-content: space-between;
    //align-items: center;
}
.user_box {
    width: 98%;
    margin: 1%;
}
</style>
