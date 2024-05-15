// 导入request
import request from '@/utils/request.ts'
// 统一接口管理
enum API {
    //获取角色列表数据
    URL_GETALLROLE = "/admin/acl/role/",
    //添加角色
    URL_ADDROLE = "/admin/acl/role/save",
    //更新角色信息
    URL_UPDATEROLE = "/admin/acl/role/update",
    //删除角色信息 
    URL_DELETEROLE = "/admin/acl/role/remove/",
    //批量删除
    URL_BATCHDELETEROLE = "/admin/acl/role/batchRemove",
    //获取角色
    URL_GETINFO = "/admin/acl/role/get/",

}
// 对外暴露请求方法
//获取角色列表
export const reqRoleList = (page: any, limit: any, roleName: any) => request.get(API.URL_GETALLROLE + `${page}/${limit}?roleName=${roleName}`);
//更新角色信息
export const reqUpdateOrAdd = (data: any) => {

    if (data.id) {
        return request.put(API.URL_UPDATEROLE, data);
    } else {
        return request.post(API.URL_ADDROLE, data);
    }

}
//删除角色列表
export const reqDeleteRole = (roleId: any) => request.delete(API.URL_DELETEROLE + roleId);
//批量删除
export const reqBatchDelete = (idList: number[]) => request.delete(API.URL_BATCHDELETEROLE, { data: idList });



