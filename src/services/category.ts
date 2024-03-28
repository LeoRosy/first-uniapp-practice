/*  分类列表-小程序
    GET
    /category/top
*/

import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

// 获取分类列表
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}
