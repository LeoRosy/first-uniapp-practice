<script setup lang="ts">
//引入
import { onLoad } from '@dcloudio/uni-app'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { ref } from 'vue'
import CustomerNavbar from './components/CustomerNavbar.vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance } from '@/components/components'
import PageSkeleton from '@/components/PageSkeleton.vue'
//定义轮播图 父组件
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  console.log(res)
  //把获取到的list赋值给bannerList
  bannerList.value = res.result
}

//获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  console.log(res)
  categoryList.value = res.result
}

//获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  console.log(res)
  hotList.value = res.result
}

//定义加载状态，用于骨架屏的显示
const isLoading = ref(false)

//页面加载
onLoad(async () => {
  isLoading.value = true
  //Promise.all用于并发执行多个 Promise 实例的操作
  Promise.all([
    await getHomeBannerData(),
    await getHomeCategoryData(),
    await getHomeHotData(),
    //不要忘记+()
  ])
  isLoading.value = false
})

//获取猜你喜欢组件实例
const guessRef = ref<XtxGuessInstance>()
//滚动触底
const onScrollTolower = () => {
  console.log('触底了')
  guessRef.value?.getMore()
}

const isTriggered = ref(false)
//自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  console.log('下拉刷新')
  //开启动画
  isTriggered.value = true
  /* await getHomeBannerData()
  await getHomeCategoryData()
  await getHomeHotData() */
  guessRef.value?.resetData()
  await Promise.all([
    getHomeBannerData(),
    getHomeCategoryData(),
    getHomeHotData(),
    guessRef.value?.getMore(),
  ])
  //关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航栏 -->
  <CustomerNavbar />
  <scroll-view
    refresher-enabled
    @scrolltolower="onScrollTolower"
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTriggered"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 自定义轮播图 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类面板 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐 -->
      <HotPanel :list="hotList" />
      <!-- 猜你喜欢 -->
      <XtxGuess ref="guessRef" />
      <view class="index">index</view>
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  flex: 1;
}
</style>
