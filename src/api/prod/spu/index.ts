import request from "@/utils/request.ts"
enum API {
    //获取已有的spu的数据
    URL_ALLSPU = "/admin/product/",
    //获取全部品牌数据
    URL_ALLTRADMAEK = "/admin/product/baseTrademark/getTrademarkList",
    //获取某个spu下的全部的售卖商品的图片数据
    URL_IMAGE = "/admin/product/spuImageList/",
    //获取某个spu下全部已有的销售属性接口地址
    URL_ALLATTR = "/admin/product/spuSaleAttrList/",
    //获取整个项目全部的销售属性
    URL_ALLSALEATTR = "/admin/product/baseSaleAttrList",
    //文件上传
    URL_UPLOAD = "/admin/product/fileUpload",
    //spu更新
    URL_UPDATE = "/admin/product/updateSpuInfo",
    //增加spu
    URL_SAVE = "/admin/product/saveSpuInfo",
    //根据spuid删除spu
    URL_DELETE = "/admin/product/deleteSpu/"
}
//获取数据的接口
export const reqSpu = (data: any, limit: any, category3Id: number) => request.get(API.URL_ALLSPU + `${data}/${limit}?category3Id=${category3Id}`);
//获取全部的SPU的品牌数据
export const reqAllTradMark = () => request.get(API.URL_ALLTRADMAEK)
//获取某一个已有的spu下全部商品的图片地址
export const reqSpuImageList = (spuId: any) => request.get<any, any>(API.URL_IMAGE + spuId);
//获取某一个已有的SPU拥有多少个销售属性
export const reqSpuHasSaleAttr = (spuid: number) => request.get<any, any>(API.URL_ALLATTR + spuid);
//获取全部销售属性
export const reqALLSaleAttr = () => request.get<any, any>(API.URL_ALLSALEATTR);
//更新spu数据
export const reqSaveOrUpdate = (data: any) => {
    if (data.id) {
        return request.post(API.URL_UPDATE, data)
    } else {
        return request.post(API.URL_SAVE, data);
    }
}
//删除spu
export const reqDelete = (spuid: any) => request.delete(API.URL_DELETE + spuid);