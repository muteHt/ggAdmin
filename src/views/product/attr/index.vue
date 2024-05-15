<template>
    <div class="attr_box">
        <category :scene="scene"></category>
        <el-card style="margin: 10px 0">
            <div v-show="scene == 0">
                <el-button type="primary" size="default" icon="Plus" :disabled="tempCate.cate3Id ? false : true" @click="handleClick"> 添加属性 </el-button>
                <el-table :data="attrData" style="margin: 10px 0px" max-height="480px">
                    <el-table-column label="序号" type="index" width="80px"></el-table-column>
                    <el-table-column prop="attrName" label="属性名称"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #default="scope">
                            <el-tag style="margin: 5px" v-for="item in scope.row.attrValueList" :key="item.id">
                                {{ item.valueName }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <!-- 给编辑按钮就添加修改事件，这里可以调用添加按钮的事件 -->
                            <el-button type="warning" size="small" icon="Edit" @click="handleEdit(scope.row)">编辑</el-button>

                            <el-popconfirm title="你确定要删除当前数据？" @confirm="handleConfirm(scope.row.id)">
                                <template #reference>
                                    <!-- 删除一行的事件 -->
                                    <el-button type="danger" size="small" icon="Delete">删除</el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="scene == 1">
                <el-form :inline="true" style="margin: 10px 0">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attrForm.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button :disabled="attrForm.attrName ? false : true" type="primary" size="default" icon="Plus" @click="AddAttr">添加属性值</el-button>
                <el-table style="margin: 10px 0; border: 1px #333" max-height="500px" :data="attrForm.attrValueList">
                    <el-table-column width="80px" type="index" label="序号"> </el-table-column>
                    <el-table-column label="属性值名称" width="380px">
                        <template #default="scope">
                            <el-input
                                :ref="(vc: any) => (inputAttr[scope.$index] = vc)"
                                v-if="scope.row.show"
                                @blur="($event) => changeShow(scope.row, scope.$index)"
                                placeholder="请输入属性值"
                                v-model="scope.row.valueName"
                            ></el-input>
                            <div v-else @click="changeShow(scope.row, scope.$index)">{{ scope.row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="属性值操作" width="280px">
                        <template #default="scope">
                            <el-button
                                type="danger"
                                icon="delete"
                                @click="
                                    () => {
                                        attrForm.attrValueList.splice(scope.$index, 1);
                                    }
                                "
                                >删除</el-button
                            ></template
                        >
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="handleSave" :disabled="attrForm.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button type="primary" size="default" @click="handleCancle">取消</el-button>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { getTransitionRawChildren, nextTick, onBeforeUnmount, reactive, ref, shallowReactive, watch } from "vue";
import CategoryStore from "@/store/modules/category/index.ts";
import { reqAttr, updateAttr, reqdeleteAttr } from "@/api/prod/attr/index.ts";
import { ScriptCompileContext } from "vue/compiler-sfc";
import { transpileModule } from "typescript";
import { ElMessage, rowContextKey } from "element-plus";
import { Row } from "element-plus/es/components/table-v2/src/components/index.mjs";

//公共数据
const attrData = ref<any>([]);
const tempCate = CategoryStore();
//定义一个空的组件实例数组
const inputAttr = ref<any>([]);
//添加属性值发送更新请求的数据的表单
const attrForm = reactive<any>({
    attrValueList: [], //属性值列表
    attrName: "", //属性名
    categoryId: "", //分类的id
    categoryLevel: 3,
});

//输入框的显示隐藏事件
const changeShow = (row: any, index: number) => {
    //非法情况1
    if (row.valueName.trim() == "") {
        //删除调用对应属性值位空的元素

        attrForm.attrValueList.splice(index, 1);

        ElMessage({
            type: "error",
            message: "属性值不能为空",
        });
        return;
    }
    //非法情况

    let repeat = attrForm.attrValueList.find((item: any) => {
        if (item != row) {
            return item.valueName === row.valueName;
        }
    });
    if (repeat) {
        attrForm.attrValueList.splice(index, 1);
        ElMessage({
            type: "error",
            message: "属性值不能重复",
        });
        return;
    }

    row.show = !row.show;
    //响应式数据发生变化获取相应的input组件实例调用聚焦方法
    nextTick(() => {
        inputAttr.value[index].focus();
    });
};
//控制添加属性的显示隐藏
const scene = ref<number>(0);
//监听cate3Id是否发生变化
watch(
    () => tempCate.cate3Id,
    () => {
        //监听仓库里边的cate3id属性如果发生变化便获取属性数据
        attrData.value = [];

        if (!tempCate.cate3Id) return;

        getAttr();
    },
);

//获取属性数据的一个函数
const getAttr = async () => {
    const { cate1Id, cate2Id, cate3Id } = tempCate;

    let result = await reqAttr(cate1Id, cate2Id, cate3Id);
    if (result.code == 200) {
        attrData.value = result.data;
    } else {
        console.log("获取属性失败");
    }
};
// 点击事件
//用于给属性表单编辑
const EditAttrValue = () => {
    alert("点击了属性值编辑");
};
//用于给属性表单删除
const deleteAttrValue = () => {
    alert("点击了属性值删除");
};

//用于在展示数据的时候进行编辑
const handleEdit = (row: any) => {
    // 将获取的对象赋值到表单进行展示
    // 深拷贝
    Object.assign(attrForm, JSON.parse(JSON.stringify(row)));
    scene.value = 1;
};
//用于在展示数据的时候进行删除属性操作
const handleDelete = async (id: any) => {
    let result = await reqdeleteAttr(id);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: "成功删除",
        });
        //删除成功后刷新数据
        getAttr();
    } else {
        ElMessage({
            type: "error",
            message: "删除失败",
        });
    }
};
//添加属性
const handleClick = () => {
    //清空属性表单
    Object.assign(attrForm, {
        attrValueList: [], //属性值列表
        attrName: "", //属性名
        categoryId: "", //分类的id
        categoryLevel: 3,
    });
    //切换场景
    scene.value = 1;
};
//点击增加一个属性值
const AddAttr = () => {
    //给表单数组增加一个对象
    attrForm.attrValueList.push({ valueName: "", show: true });

    nextTick(() => {
        //获取更新后组件对象然后调用相应的focus事件
        //inputAttr.value[]
        inputAttr.value[attrForm.attrValueList.length - 1].focus();
    });
};

//点击存储
const handleSave = async () => {
    attrForm.categoryId = tempCate.cate3Id; //设置参数
    //发送请求
    let result = await updateAttr(attrForm);
    if (result.code == 200) {
        ElMessage({
            type: "success",
            message: attrForm.id ? "修改成功" : "添加成功",
        });

        //添加成功获取已有的属性值
        getAttr();
        scene.value = 0; //验证成功切换场景
    } else {
        ElMessage({
            type: "error",
            message: attrForm.id ? "修改失败" : "添加失败",
        });
    }
};

//点击取消
const handleCancle = () => {
    scene.value = 0;
};
//点击处理气泡验证
const handleConfirm = (id: any) => {
    //调用删除函数
    //console.log(id);
    handleDelete(id);
};
//进行页面跳转的时候清空仓库对象上的数据
onBeforeUnmount(() => {
    tempCate.$reset();
});
//点击
</script>
<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
.attr_box {
    width: 98%;
    margin: 1%;
}
</style>
