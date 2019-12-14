import axios from '@/untils/myaxios'
export const userLogin = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}
