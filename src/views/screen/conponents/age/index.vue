<template>
    <div class="genderRate">
        <div class="top">
            <p class="title">年龄比例</p>
            <p class="bg"></p>
        </div>
        <div class="img_box"></div>
        <!-- echart展示图形图表的盒子 -->
        <div class="chart_box" ref="charts"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

//水球图拓展插件
let charts = ref();
onMounted(() => {
    let mychart = echarts.init(charts.value);
    mychart.setOption({
        tooltip: {
            trigger: "item",
        },
        legend: {
            top: "5%",
            right: 10,
            orient: "vertical",
            textStyle: {
                color: "white",
            },
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: "bold",
                    },
                },
                labelLine: {
                    show: false,
                },
                data: [
                    { value: 1048, name: "Search Engine" },
                    { value: 735, name: "Direct" },
                    { value: 580, name: "Email" },
                    { value: 484, name: "Union Ads" },
                    { value: 300, name: "Video Ads" },
                ],
            },
        ],
    });
});
</script>

<style lang="scss" scoped>
.genderRate {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: cover;
    margin-top: 10px;
    .top {
        margin-left: 20px;
        .title {
            color: white;
            font-size: 18px;
            font-weight: 700;
        }
        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png);
            background-size: 100% 100%;
            margin-top: 20px;
        }
    }

    .chart_box {
        width: 100%;
        height: 250px;
    }
}
</style>
