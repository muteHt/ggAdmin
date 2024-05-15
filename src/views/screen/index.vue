<template>
    <div class="container">
        <div class="screen" ref="screen">
            <Top />
            <div class="screen_buttom">
                <div class="buttom_left">
                    <Tourist class="tourist" />
                    <GenderRate class="genderRate" />
                    <Age class="age" />
                </div>
                <div class="buttom_center">
                    <div class="map_box"><Map></Map></div>
                    <div class="myline_box"><myline></myline></div>
                </div>
                <div class="buttom_right">
                    <div class="rank">
                        <Rank></Rank>
                    </div>
                    <div class="year">
                        <year></year>
                    </div>
                    <div class="counter">
                        <Counter></Counter>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import Top from "./conponents/top/index.vue";
import Tourist from "./conponents/tourist/index.vue";
import Age from "./conponents/age/index.vue";
import GenderRate from "./conponents/genderRate/index.vue";
import Map from "./conponents/map/index.vue";
import myline from "./conponents/line/index.vue";
import Year from "./conponents/year/index.vue";
import Rank from "./conponents/rank/index.vue";
import Counter from "./conponents/counter/index.vue";
let screen = ref();
//定义大屏的放缩比例
function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
}
//监听视口变化
window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
};
//初始化组件
onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
});
</script>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    background-image: url("./images/bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        top: 50%;
        left: 50%;
        transform-origin: left top;
        .top {
            width: 100%;
            height: 40px;
            background-color: red($color: #000000);
        }
        .screen_buttom {
            display: flex;
            width: 100%;
            padding-bottom: 20px;
            height: 1020px;
            .buttom_right {
                flex: 1;
                display: flex;
                height: 100%;
                flex-direction: column;

                .rank {
                    flex: 1.2;
                    //background-color: blue;
                }
                .year {
                    flex: 1;
                    //background-color: red;
                }
                .counter {
                    flex: 1;
                    // background-color: green;
                }
            }
            .buttom_left {
                flex: 1;
                display: flex;
                height: 100%;
                flex-direction: column;

                .tourist {
                    flex: 1.2;
                    //background-color: blue;
                }
                .genderRate {
                    flex: 1;
                    //background-color: red;
                }
                .age {
                    flex: 1;
                    //background-color: green;
                }
            }
            .buttom_center {
                flex: 2;
                display: flex;
                flex-direction: column;
                height: 100%;
                .map_box {
                    flex: 3;
                }
                .myline_box {
                    flex: 1;
                }
            }
        }
    }
}
</style>
