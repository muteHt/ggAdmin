<template>
    <div class="home_box">
        <el-card>
            <div class="home_user_box">
                <img :src="tempUserStore.avatar" alt="#" />
                <div class="home_userName_box">
                    <h3>{{ getTime() }}呀！！！{{ tempUserStore.userName }}</h3>
                    <p>硅谷运营平台</p>
                </div>
            </div>
        </el-card>
        <div class="back_box">
            <img src="../../assets/images/base_back.png" alt="" style="width: 800px" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { getTime } from "../../utils/time";
import UserStore from "@/store/modules/user/index.ts";
let tempUserStore = UserStore();
onMounted(() => {
    tempUserStore.userInfo();
});
</script>

<style lang="scss" scoped>
/* // @import "@/styles/login.scss"; */
.home_box {
    width: 98%;
    margin: 1%;

    .home_user_box {
        margin: 20px;

        img {
            float: left;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            padding-bottom: 20px;
        }
        .home_userName_box {
            float: left;
            margin-left: 20px;
            h3 {
                font-size: 28px;
                font-weight: 900;
            }

            p {
                margin-top: 40px;
                color: #ccc;
            }
        }
    }
    .back_box {
        display: flex;
        justify-content: center;
    }
}
</style>
