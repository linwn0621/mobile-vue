// 获取文章列表
import axios from '@/untils/myaxios'
export const Getnewsdata = (params) => {
  return axios({
    url: '/post',
    params
  })
}
