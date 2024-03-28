import type { XtsGuessInstance } from '@/types/component'
import { ref } from 'vue'
//猜你喜欢的组合式函数
export const useGuessList = () => {
  //获取猜你喜欢组件实例
  const guessRef = ref<XtsGuessInstance>()
  //滚动触底事件
  const onScrollTolower = () => {
    //console.log('触底')
    guessRef.value?.getMore()
  }
  //返回
  return {
    guessRef,
    onScrollTolower,
  }
}
