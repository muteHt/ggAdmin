import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from "@/api/prod/attr/index.ts";
const CategoryStore = defineStore("Category", {

    state: () => {
        return {
            cate1List: [],//一级目录的数组
            cate2List: [],//二级目录的数组
            cate3List: [],//三级目录的数组
            cate1Id: '',//一级目录获取的参数
            cate2Id: '',//二级级目录获取的参数
            cate3Id: '',//三级级目录获取的参数
            attrList: []//属性对象

        }
    },
    getters: {

    },
    actions: {
        //用于获取各级数据的函数，格式差不多
        async getCate1() {
            let result = await reqC1();
            if (result.code == 200) {
                this.cate1List = result.data;
            }
            else {
                console.log("获取一级数据失败")
            }
        },
        async getCate2() {
            let result = await reqC2(this.cate1Id);
            if (result.code == 200) {
                this.cate2List = result.data;
            }
            else {
                console.log("获取二级数据失败")
            }
        },
        async getCate3() {
            let result = await reqC3(this.cate2Id);
            if (result.code == 200) {
                this.cate3List = result.data;
            }
            else {
                console.log("获取三级数据失败")
            }
        }

    }

})

export default CategoryStore;