import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user/index.ts";
//创建axios实例
let request = axios.create({
    baseURL: '/api',
    timeout: 5000,
})
//请求拦截器
request.interceptors.request.use(config => {
    //获取仓库对象
    let userStore = useUserStore();
    //判断是否登录
    if (userStore.user_token) {
        config.headers.token = userStore.user_token
    }
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';

    let status = error.response.status;


    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});

export default request;