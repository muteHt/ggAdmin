// 导入request
import request from '@/utils/request.ts'
import { loginForm, loginResponseData, userResponseData } from './type'
// 统一接口管理
enum API {
    //用户登录接口
    LOGIN_URL = "/user/login",
    //获取用户信息接口
    USERINFO_URL = "/user/info/",
    //退出登录接口
    LOGOUT_URL = "",
    //获取用户列表接口
    URL_GETUSERS = "/admin/acl/user/",
    //增加用户
    URL_ADDUSER = "/admin/acl/user/save",
    //更新用户
    URL_UPDATEUSER = "/admin/acl/user/update",
    //根据用户id获取所有的角色数据
    URL_GETALLROLE = "/admin/acl/user/toAssign/",
    //给已有的用户分配角色职位
    URL_ASSIGNROLE = "/admin/acl/user/doAssignRole",
    //删除当前用户
    URL_DELETEUSER = "/admin/acl/user/remove/",
    //批量删除用户
    URL_DELETEUSERLIST = "/admin/acl/user/batchRemove"

}
// 对外暴露请求方法
//登录验证接口
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data);
//获取用户信息的接口
export const reqUserInfo = (data: any) => request.get<any, userResponseData>(API.USERINFO_URL + `?userId=${data}`);
//获取用户列表接口
export const reqUserList = (page: any, limit: any, username: any) => request.get<any>(API.URL_GETUSERS + `${page}/${limit}?username=${username}`)
//用户更新或者删除 
export const reqAddOrUpdate = (data: any) => {
    if (data.id) {
        return request.put<any, any>(API.URL_UPDATEUSER, data)
    } else {
        return request.post<any, any>(API.URL_ADDUSER, data)
    }
}
//获取所有角色数据
export const reqAllRole = (userid: any) => request.get(API.URL_GETALLROLE + userid)
//给用户分配角色
export const reqAssignRole = (data: any) => request.post(API.URL_ASSIGNROLE, data)
//删除用户
export const reqDelete = (data: any) => request.delete(API.URL_DELETEUSER + data)
//批量删除
export const reqBachDelete = (idList: number[]) => request.delete<any>(API.URL_DELETEUSERLIST, { data: idList });
