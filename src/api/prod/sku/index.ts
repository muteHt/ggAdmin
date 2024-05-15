import request from "@/utils/request.ts"
enum API {
    //sku下架
    URL_CANCELSALE = "/admin/product/cancelSale/",
    //sku上架
    URL_ONSALE = "/admin/product/onSale/",
    //删除一个sku
    URL_DELETE = "/admin/product/deleteSku/",
    //根据spuID查找spu
    URL_FINDSKU = "/admin/product/findBySpuId/",
    //获取sku信息
    URL_GETSKUINFO = "/admin/product/getSkuInfo/",
    //根据关键字查找SKU
    URL_FINDSKUBYKEYWORD = "/admin/product/inner/findSkuInfoByKeyword/{keyword}",
    //获取SKU更具skuidlist
    URL_FINDSKUBYSKUIDLIST = "/admin/product/inner/findSkuInfoBySkuIdList",
    //根据索引和页码获取SKU信息
    URL_FINDSKUBYINDEX = "/admin/product/list/",
    //存储SKU信息
    URL_SAVESKUINFO = "/admin/product/saveSkuInfo",
    //获取SPUID获取图片列表
    URL_GETSPUIDIMAGELIST = "/admin/product/spuImageList/{spuId}",
    //获取SKU销售属性列表
    URL_GETSKUSALELIST = "/admin/product/spuSaleAttrList/{spuId}",
    //更新SKU信息
    URL_UPDATESKUINFO = "/admin/product/updateSkuInfo"

}
//增加一个sku
export const reqAddSku = (data: any) => request.post(API.URL_SAVESKUINFO, data);
//根据spuid获取sku列表
export const reqSkuList = (data: any) => request.get(API.URL_FINDSKU + data)
//根据索引和页码返回数据
export const reqSkuData = (page: any, limit: any) => request.get(API.URL_FINDSKUBYINDEX + page + '/' + limit)
//商品上架接口
export const reqSkuIsSale = (skuid: any) => request.get<any>(API.URL_ONSALE + skuid);
//商品下架接口
export const reqCancleSale = (skuid: any) => request.get<any>(API.URL_CANCELSALE + skuid);
//获取商品详情页面的数据
export const reqSkuInfo = (skuid: any) => request.get<any>(API.URL_GETSKUINFO + skuid);
//删除对应的sku数据
export const reqDelete = (skuid: any) => request.delete(API.URL_DELETE + skuid)