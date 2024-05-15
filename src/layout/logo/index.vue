<template>
    <div class="logo_box" v-if="setting.isHidden">
        <img :src="setting.logo" alt="#" />
        <p @click="handletitle">{{ setting.title }}</p>
    </div>
</template>

<script lang="ts" setup>
//引入logo设置
import setting from "@/setting";
</script>

<style lang="scss" scoped>
.logo_box {
    height: $base-menu-logo-innerHeight;
    color: white;
    display: flex;
    align-items: center;
    padding: 20px;
    background-color: $base-menu-backgroud;
    img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
    }
    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
    }
}
</style>
