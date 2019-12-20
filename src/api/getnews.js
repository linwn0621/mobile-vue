// 獲取文章詳情
import axios from '@/untils/myaxios'
export const getnews = (id) => {
  return axios({
    url: `/post/${id}`
  })
}
// 关注用户
export const guanzhu = (id) => {
  return axios({
    url: `/user_follows/${id}`

  })
}
export const quguan = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}
