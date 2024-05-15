<template>
    <div class="tourist">
        <div class="top">
            <p class="title">实时人数统计</p>
            <p class="bg"></p>
            <p class="right">可预约的人数<span>9999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in peple" :key="index"> {{ item }}</span>
        </div>
        <!-- echart展示图形图表的盒子 -->
        <div class="chart_box" ref="charts"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

//水球图拓展插件
import "echarts-liquidfill";
let peple = ref("215654人");
let charts = ref();

onMounted(() => {
    let mychart = echarts.init(charts.value);
    mychart.setOption({
        series: [
            {
                type: "liquidFill",
                name: "预约量",
                data: [
                    {
                        value: 0.6,
                    },
                ],
                radius: "90%",
                label: {
                    formatter: function (param: any) {
                        return param.seriesName + "\n" + "\n" + "Value:" + param.value;
                    },
                    fontSize: 18,
                },
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
        height: 200px;
    }
}
</style>
