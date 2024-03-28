/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import type XtxGuess from '@/components/XtxGuess.vue'
import type XtxSwiper from '@/components/XtxSwiper.vue'
import 'vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtsSwiper: typeof XtxSwiper
    XtsGuess: typeof XtxGuess
  }
}
//组件实例
export type XtsGuessInstance = InstanceType<typeof XtxGuess>
