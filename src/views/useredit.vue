<template>
  <div>
<erithead title="编辑个人信息">

  <van-icon name="arrow-left" slot='left' @click="$router.back()" />

    <span slot='right' @click="$router.back()">退出</span>

</erithead>
 <div class="head">
      <img alt :src="userdata.head_img" />
          <van-uploader :after-read="afterRead" />
    </div>
<Mycell leftname="昵称" :rightname="userdata.nickname" @click="nickshow=!nickshow"></Mycell>
  <!-- 引入dialog框 -->
  <van-dialog v-model="nickshow" title="昵称修改" show-cancel-button @confirm="uploadname">
      <van-field

    required

    label="用户名"
    right-icon="question-o"
    placeholder="请输入用户名"
:value="userdata.nickname"
ref="nickname"
  />
    <!-- <van-field required  label="昵称" placeholder="请输入昵称" /> -->
</van-dialog>
<Mycell leftname="密码" :rightname="userdata.password"></Mycell>
<Mycell leftname="性别" :rightname="userdata.gender"></Mycell>
  </div>
</template>

<script>
// 引入头部
import erithead from '@/components/myhead'
// 引入单元格
import Mycell from '@/components/mycell'
// 引入上传请求
import { Uploadfile } from '@/api/uploadfile'
// 引入用户信息更新请求,用户信息获取
import { Update, userdata } from '@/api/users'

// import { userdata } from '@/api/users'

export default {
  data () {
    return {
      id: '',
      userdata: { },
      nickshow: false
    }
  },
  mounted () {
    // console.log(this.$route.params.id)
    this.id = this.$route.params.id
    // 用户信息获取
    userdata(this.id)
      .then(res => {
        this.userdata = res.data.data
        if (this.userdata.head_img) {
          this.userdata.head_img = localStorage.getItem('baseurl') + this.userdata.head_img
        } else {
          this.userdata.head_img = localStorage.getItem('baseurl') + '/uploads/image/default.png'
        }
        // console.log(this.userdata)
      })
      .catch(err => {
        console.log(err)
      })
  },
  components: {
    erithead, Mycell
  },
  methods: {
    // 点击确定修改昵称
    async uploadname () {
      console.log(this.$refs.nickname.$refs.input.value)
      let nickname = this.$refs.nickname.$refs.input.value
      let res3 = await Update(this.id, { nickname })
      console.log(res3)
      if (res3.data.message === '修改成功') {
        this.userdata.nickname = nickname
        this.$toast.success(res3.data.message)
      } else {
        this.$toast.fail(res3.data.message)
      }
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      var formdata = new FormData()
      formdata.append('file', file.file)
      // Uploadfile(formdata)
      //   .then(res => {
      //     console.log(res)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      let res = await Uploadfile(formdata)
      console.log(1, res)
      if (res.data.message === '文件上传成功') {
      //  动态绑定刷新页面头像
        this.userdata.head_img = localStorage.getItem('baseurl') + res.data.data.url
        console.log(this.userdata.head_img)
        // 修改服务器里的头像
        let res2 = await Update(this.id, { head_img: res.data.data.url })
        if (res2.status === 200) {
          // 这里不用再进行页面刷新了，是因为之前已经重置了变量
          this.$toast.success(res2.data.message)
        }
      } else {
        this.$toast.fail('文件上传失败')
      }
    }
  }

}
</script>

<style lang='less' scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
  /deep/.van-uploader__upload{
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
}
// 让元素居中
/deep/.van-uploader{
position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    opacity: 0;
}
}
</style>
