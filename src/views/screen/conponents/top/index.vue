<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome"> 首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前时间是:{{ nowTime }}</span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { getNowTime } from "@/utils/time.ts";
import { onBeforeMount, onMounted, ref } from "vue";
let $router = useRouter();
let nowTime = ref("");
//按钮点击的回调
const goHome = () => {
    $router.push("/home");
};
let timer = ref(0);

//定时器显示时间

onMounted(() => {
    timer.value = setInterval(() => {
        nowTime.value = getNowTime();
    }, 1000);
});
onBeforeMount(() => {
    clearInterval(timer.value);
});
</script>

<style lang="scss" scoped>
.top {
    display: flex;
    float: left;
    width: 100%;
    height: 40px;
    .left {
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        .lbtn {
            float: right;
            width: 150px;
            height: 40px;
            cursor: pointer;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: cover;
        }
    }
    .right {
        flex: 1.5;
        display: flex;
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: cover;
        justify-content: space-between;
        color: #29fcff;
        align-items: center;
        .rbtn {
            float: left;
            width: 150px;
            height: 40px;
            text-align: center;
            line-height: 40px;

            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: cover;
        }
        .time {
            margin-right: 20px;
        }
    }
    .center {
        flex: 2;
        background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
        background-size: cover;
        .title {
            width: 100%;
            height: 74px;
            font-size: 32px;
            font-weight: 800;
            background: url(../../images/dataScreen-header-center-bg.png);
            background-size: 100% 100%;
            text-align: center;
            color: #29fcff;
            line-height: 74px;
        }
    }
}
</style>
