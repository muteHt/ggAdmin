// 导入request
import request from '@/utils/request.ts'
// 统一接口管理
enum API {
    //获取所有的权限菜单
    URL_GETPER = "/admin/acl/permission",
    //根据角色获取菜单
    URL_GETPERBYROLE = "/admin/acl/permission/toAssign/",
    //给用户分配权限的接口
    URL_ASSIGNPERMISSION = "/admin/acl/permission/doAssign/?",
    //删除权限的接口
    URL_REMOVE = "/admin/acl/permission/remove/",
    //修改权限的接口
    URL_UPDATE = "/admin/acl/permission/update",
    //增加一个菜单
    URL_SAVE = "/admin/acl/permission/save",
}
//获取菜单的列表
export const reqManu = () => {
    return request.get(API.URL_GETPER);
}
//根据角色获取菜单
export const reqManuByRole = (id: any) => {
    return request.get(API.URL_GETPERBYROLE + id)
}
//给用户分配权限
export const reqAssignPermission = (id: any, idlist: any) => request.post(API.URL_ASSIGNPERMISSION + `roleId=${id}&&permissionId=${idlist}`)

//增加或者更新菜单
export const reqADDORUPDATE = (data: any) => {
    if (data.id) {

        return request.put(API.URL_UPDATE, data);

    } else {
        return request.post(API.URL_SAVE, data);
    }
}
//递归删除权限
export const reqRemove = (id: any) => {
    return request.delete(API.URL_REMOVE + id);
}