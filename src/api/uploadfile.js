import axios from '@/untils/myaxios'
export const Uploadfile = (data) => {
  return axios({
    url: '/upload',
    method: 'post',
    data
  })
}
