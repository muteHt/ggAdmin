import request from '@/utils/request.ts'
// 统一接口管理
enum API {
    //获取当前页面数据的接口
    URL_TRADMARK_CURRENTLIST = "/admin/product/baseTrademark/",
    //存储数据的接口
    URL_TRADMARK_FIND = "/admin/product/baseCategoryTrademark/findTrademarkList/",
    // 删除数据的接口
    URL_TRADMARK_DELETE = "/admin/product/baseTrademark/remove/",
    // 查找数据的接口
    URL_TRADMARK_SAVE = "/admin/product/baseCategoryTrademark/save",


}
// 对外暴露请求方法
//获取当前页面品牌信息的接口
export const reqAllTradMark = (page: number, limit: number) => request.get<any, any>(API.URL_TRADMARK_CURRENTLIST + page + '/' + limit);
//查找某一个品牌的数据
export const reqFindTradMark = (data: number) => request.get<any, any>(API.URL_TRADMARK_FIND + data);
//保存某个品牌的数据
export const reqSaveTradMark = (data: number) => request.post<any, any>(API.URL_TRADMARK_SAVE + data);
//删除某个品牌的数据
export const reqDeleteTradMark = (data: number) => request.delete<any, any>(API.URL_TRADMARK_DELETE + data);