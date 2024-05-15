<template>
    <div class="tourist">
        <div class="top">
            <p class="title">热门景区排行</p>
            <p class="bg"></p>
        </div>
        <!-- echart展示图形图表的盒子 -->
        <div class="chart_box" ref="charts"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

let charts = ref();

onMounted(() => {
    let mychart = echarts.init(charts.value);
    mychart.setOption({
        grid: {
            top: "15%",
            left: "5%",
            right: "10%",
            bottom: "5%",
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        xAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
        },
        yAxis: {
            type: "category",
            data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
        },
        series: [
            {
                name: "2011",
                type: "bar",
                data: [18203, 23489, 29034, 104970, 131744, 630230],
            },
            {
                name: "2012",
                type: "bar",
                data: [19325, 23438, 31000, 121594, 134141, 681807],
            },
        ],
    });
});
</script>

<style lang="scss" scoped>
.tourist {
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
            margin-top: 10px;
        }
        .right {
            float: right;
            font-size: 14px;
            color: #29fcff;
            span {
                color: #29fcff;
            }
        }
    }
    .number {
        display: flex;
        margin: 0 20px;
        font-size: 20px;
        font-weight: 700;
        color: #29fcff;
        margin-top: 60px;
        span {
            flex: 1;
            height: 40px;
            text-align: center;
            line-height: 40px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .chart_box {
        width: 100%;
        height: 340px;
    }
}
</style>
