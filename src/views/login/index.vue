<template>
    <div class="login_box">
        <el-form :model="loginForm" class="demo-form-inline" :rules="rules">
            <h1 class="lable">Hello</h1>
            <h1 class="lable">欢迎光临</h1>
            <p style="color: white">使用admin和123456登录超级管理员</p>
            <p style="color: white">使用system和123456登录管理员</p>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="用户名" clearable />
            </el-form-item>

            <el-form-item prop="pass">
                <el-input :prefix-icon="Lock" v-model="loginForm.pass" placeholder="密码" clearable show-password />
            </el-form-item>

            <el-form-item>
                <el-button @click="login(loginForm)">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Lock, User } from "@element-plus/icons-vue";
import UserStore from "@/store/modules/user/index.ts";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { getTime } from "@/utils/time.ts";

// 数据
const userstore = UserStore();
const router = useRouter();
const route = useRoute();
let loginForms = ref();

// 声明数据
const loginForm = reactive({
    username: "admin",
    pass: "123456",
});

//编写函数
const login = async (loginForm) => {
    //判断登录的时候，路由路径当中是否有query参数，如果没query参数跳转到首页，有query参数跳转到参数页
    let redirect = route.query.redirect;
    // 调用登录接口验证是否登录
    //登录成功跳转页面，并加载用户数据
    //失败弹出提示信息
    //console.log(loginForm)
    //await loginForm.value.validate()
    try {
        await userstore.userLogin(loginForm);

        router.push({ path: redirect || "/" });

        ElNotification({
            type: "success",
            message: "Hi " + getTime(),
            title: "欢迎回来！！！",
        });
    } catch (event) {
        ElNotification({
            type: "error",
            message: "登录错误",
        });
    }
};

// 表单校验
//用户名校验
const validateUserName = (rule: any, value: any, callback: any) => {
    if (value.length < 5) {
        callback(new Error("用户名必须大于等于5位"));
    } else {
        callback();
    }
};
//密码校验
const validatePass = (rule: any, value: any, callback: any) => {
    if (value.length < 5) {
        callback(new Error("密码必须大于等于5位"));
    } else {
        callback();
    }
};

const rules = reactive({
    username: [{ trigger: "blur", validator: validateUserName }],
    pass: [{ trigger: "blur", validator: validatePass }],
});
//表单校验
</script>

<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */

.login_box {
    height: 100vh;
    width: 100%;
    background: url("@/assets/images/login_page.png");
    background-repeat: no-repeat;
    .demo-form-inline {
        margin: 0vh auto;
        width: 400px;
        padding-top: 30vh;
        background-color: rgba(255, 255, 255, 0);
        h1 {
            padding: 1vh 0;
            font-size: 32;
            color: white;
        }
        .el-button {
            width: 100%;
            background-color: white;
        }
    }
}

// const userdata = [
//     {
//         userId: 1,
//         avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
//         username: "admin",
//         password: "123456",
//         desc: "超级管理员",
//         roles: ["超级管理员"],
//         buttons: ["cuser.detail"],
//         routes: ["acl", "manu", "spu", "sku", "role", "product", "attr", "trademark", "user"],
//         token: "eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSSkzJzcxT0lFKrShQsjI0MzQzMTK1NDGvBQApMebnIAAAAA.UG2Qj7F7ASMLBugNG67-wKs0Un6ORrneMkSdio0rKhX0o-fd6BC24T1gCzfVVtsNERPzs4Sjwz8JOyPfLazUSA",
//     },
//     {
//         userId: 2,
//         avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
//         username: "system",
//         password: "123456",
//         desc: "系统管理员",
//         roles: ["系统管理员"],
//         buttons: ["cuser.detail", "cuser.user"],
//         routes: ["spu", "sku", "trademark", "product", "attr"],
//         token: "eyJhbGciOiJIUzUxMiIsInppcCI6IkdaSVAifQ.H4sIAAAAAAAAAKtWKi5NUrJSSkzJzcxT0lFKrShQsjI0MzQzMTK1NDGvBQApMebnIAAAAA.UG2Qj7F7ASMLBugNG67-wKs0Un6ORrneMkSdio0rKhX0o-fd6BC24T1gCzfVVtsNERPzs4Sjwz8JOyPfLazUSA",
//     },
// ];

// const reqLogin = (data) => {
//     let checkUser = userdata.find((item) => {
//         return item.username === data.username && item.password === data.password;
//     });
//     //没有用户返回失败信息
//     if (!checkUser) {
//         return { code: 201, data: { message: "账号或密码不正确" } };
//     }
//     //如果有返回成功信息

//     const { token, avatar, userId } = checkUser;
//     const tempName = checkUser.username;

//     return { code: 200, data: { token, tempName, userId, avatar } };
// };
// const reqUserInfo = (data) => {
//     //获取请求头携带token
//     // const token = request.headers.token;
//     const userId = data;
//     //查看用户信息是否包含有次token用户
//     const checkUser = userdata.find((item) => item.userId == userId);
//     // const checkUser = createUserList().find((item) => item.token === token)
//     //没有返回失败的信息
//     if (!checkUser) {
//         return new { code: 201, data: { message: "获取用户信息失败" } }();
//     }
//     //如果有返回成功信息
//     return { code: 200, data: { checkUser } };
// };
// const mockLogin = (loginForm) => {
//     let result = reqLogin(loginForm);
//     console.log(result);
// };
</style>
