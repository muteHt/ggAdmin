<template>
    <div class="map_box" ref="map"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import chinaJson from "./china.json";
import { ref, onMounted } from "vue";

let map = ref();
echarts.registerMap("china", chinaJson);
onMounted(() => {
    let myechart = echarts.init(map.value);
    myechart.setOption({
        geo: {
            map: "china",
            roam: true,
            left: 50,
            right: 50,
            top: 100,
            buttom: 50,
            label: {
                show: true,
                rotate: 20,
                color: "#29fcff",
            },
            itemStyle: {
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: "blue", // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: "skyblue", // 100% 处的颜色
                        },
                    ],
                    global: false, // 缺省为 false
                },
                opacity: 0.8,
            },
        },
        series: [
            {
                type: "lines",
                data: [
                    {
                        coords: [
                            [109.82951587, 15.22896754],
                            [109.29161878, 16.19765288],
                        ],
                        lineStyle: {
                            color: "skyblue",
                            width: 5,
                        },
                    },
                ],
            },
        ],
    });
});
</script>
<style lang="scss" scoped>
.map_box {
    width: 100%;
    height: 100%;
}
</style>
