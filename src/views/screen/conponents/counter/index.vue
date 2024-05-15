<template>
    <div class="counter_box">
        <div class="top">
            <p class="title">各平台预约统计</p>
            <p class="bg"></p>
        </div>
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
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: "50%",
                data: [
                    { value: 1048, name: "Search Engine" },
                    { value: 735, name: "Direct" },
                    { value: 580, name: "Email" },
                    { value: 484, name: "Union Ads" },
                    { value: 300, name: "Video Ads" },
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    });
});
</script>

<style lang="scss" scoped>
.counter_box {
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
