// 导入request
import request from '@/utils/request.ts'
// 统一接口管理
enum API {
    //用户登录接口
    LOGIN_URL = "/admin/acl/index/login",
    //获取用户信息接口
    USERINFO_URL = "/admin/acl/index/info",
    //退出登录接口
    LOGOUT_URL = "/admin/acl/index/logout",
    //获取用户列表接口
    URL_GETUSERS = "/admin/acl/user/",
    //

}
// 对外暴露请求方法
//登录验证接口
export const reqLogin = (data: any) => request.post<any, any>(API.LOGIN_URL, data);
//获取用户信息的接口
export const reqUserInfo = () => request.get<any, any>(API.USERINFO_URL);
//退出登录的接口
export const reqLogout = () => request.get<any>(API.LOGOUT_URL);
//获取用户列表接口
export const reqUserList = (page: any, limit: any) => request.get<any>(API.URL_GETUSERS + `${page}/${limit}`)


