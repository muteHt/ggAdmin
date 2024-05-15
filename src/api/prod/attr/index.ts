//这里书写属性的
import request from "@/utils/request.ts"

enum API {
    URL_C1 = "/admin/product/getCategory1",//获取一级分类
    URL_C2 = "/admin/product/getCategory2",//获取二级分类
    URL_C3 = "/admin/product/getCategory3",//获取三级分类
    URL_ATTR = "/admin/product/attrInfoList",//获取属性
    URL_ADDORUPDATEATTR = "/admin/product/saveAttrInfo",//更新数据
    URL_DELETE = "/admin/product/deleteAttr"
}

//获取一级分类数据
export const reqC1 = () => request.get<any, any>(API.URL_C1)
//获取二级分类数据
export const reqC2 = (data: number) => request.get<any, any>(API.URL_C2 + "/" + data)
//获取三级分类数据
export const reqC3 = (data: number) => request.get<any, any>(API.URL_C3 + "/" + data)
//获取属性
export const reqAttr = (id1: number | string, id2: number | string, id3: number | string) => request.get<any, any>(API.URL_ATTR + "/" + id1 + "/" + "/" + id2 + "/" + id3)
//修改或新增属性接口
export const updateAttr = (data: any) => request.post<any, any>(API.URL_ADDORUPDATEATTR, data);
//删除属性
export const reqdeleteAttr = (data: any) => request.delete<any, any>(API.URL_DELETE + "/" + data);
