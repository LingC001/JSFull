<template>
  <div>
    <router-view></router-view>
    <!--    <van-tabbar v-model="active">-->
    <!--        <van-tabbar-item icon="home-o">资产</van-tabbar-item>-->
    <!--        <van-tabbar-item icon="search">报表</van-tabbar-item>-->
    <!--        <van-tabbar-item icon="friends-o">计算</van-tabbar-item>-->
    <!--        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>-->
    <!--    </van-tabbar>-->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active: 0
      }
    }
  }
</script>

<style></style>
