<template>
    <div class="line_box">
        <div class="top">
            <p class="title">未来七天游客数量趋势</p>
            <p class="bg"></p>
        </div>
        <div class="chart_box" ref="line"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
let line = ref();
onMounted(() => {
    let mychart = echarts.init(line.value);
    mychart.setOption({
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "line",
                areaStyle: {},
            },
        ],
    });
});
</script>
<style lang="scss" scoped>
.line_box {
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0 20px;
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
            margin-top: 10px;
        }
    }
    .chart_box {
        width: 100%;
        height: 240px;
    }
}
</style>
