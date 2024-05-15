<template>
    <div class="genderRate">
        <div class="top">
            <p class="title">男女比例</p>
            <p class="bg"></p>
        </div>
        <div class="img_box">
            <div class="man">
                <p>男士</p>
                <img src="../../images/man.png" alt="#" />
            </div>
            <div class="woman">
                <p>女士</p>
                <img src="../../images/woman.png" alt="#" />
            </div>
        </div>
        <!-- <div class="title">
            <p>男士比例58%</p>
            <p>女士比例42%</p>
        </div> -->
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
        xAxis: {
            show: false,
            min: 0,
            max: 100,
        },
        yAxis: {
            show: false,
            type: "category",
        },
        series: [
            {
                type: "bar",
                data: [58],
                barWidth: 20,
                z: 10,
                itemStyle: {
                    color: "skyblue",
                    borderRadius: 20,
                },
            },
            {
                type: "bar",
                data: [100],
                barWidth: 20,
                barGap: "-100%",
                itemStyle: {
                    color: "pink",
                    borderRadius: 20,
                },
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
    .img_box {
        display: flex;
        justify-content: center;
        margin-top: 40px;

        .man {
            display: flex;
            justify-content: center;
            align-content: center;
            flex-direction: column;
            background: url(../../images/man-bg.png) no-repeat;
            background-size: 100% 100%;
            margin: 0 20px;
            img {
                margin: 10px;
                width: 111px;
                height: 115px;
            }
            p {
                height: 40px;
                line-height: 40px;
                color: white;
                font-size: 14px;
                justify-content: center;
                display: flex;
                align-content: center;
            }
        }
        .woman {
            margin: 0 20px;
            flex-direction: column;
            justify-content: center;
            display: flex;
            align-content: center;
            background: url(../../images/woman-bg.png) no-repeat;
            background-size: 100% 100%;
            img {
                margin: 10px;
                width: 111px;
                height: 115px;
            }
            p {
                height: 40px;
                line-height: 40px;
                color: white;
                font-size: 14px;
                justify-content: center;
                display: flex;
                align-content: center;
            }
        }
    }
    .title {
        font-size: 22px;
        display: flex;
        justify-content: space-between;
        p {
            color: white;
        }
    }
    .chart_box {
        width: 100%;
        height: 50px;
    }
}
</style>
