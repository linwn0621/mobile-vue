<template>
  <div class="personal">
   <router-link :to="'/useredit/'+userdatas.id" >
  <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
    <img alt :src="userdatas.head_img" />

        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{userdatas.nickname}}
          </div>
          <div class="time">2019-12-15</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <Mycell leftname="我的关注" rightname="关注的用户" @click="bj" ></Mycell>
    <Mycell leftname="我的跟帖" rightname="跟帖/回复" @click="bj"></Mycell>
    <Mycell leftname="我的收藏" rightname="文章/视频" @click="bj"></Mycell>
    <Mycell leftname="设置"  @click="bj"></Mycell>
<btn myname="退出" class="btnstyle" @click="out" ></btn>
  </div>
</template>

<script>
import { userdata } from '@/api/users'
// 引入用户编辑单元格
import Mycell from '@/components/mycell'
// 引入按钮
import btn from '@/components/mybutton'

export default {
  data () {
    return {
      userdatas: {}
    }
  },
  components: {
    Mycell, btn
  },
  mounted () {
    let id = this.$route.params.id
    // console.log(id)
    userdata(id)
      .then(res => {
        this.userdatas = res.data.data
        if (this.userdatas.head_img) {
          this.userdatas.head_img = localStorage.getItem('baseurl') + this.userdatas.head_img
        } else {
          this.userdatas.head_img = localStorage.getItem('baseurl') + '/uploads/image/default.png'
        }
        console.log(this.userdatas)
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    // 点击编辑单元格
    bj (event) {
      console.log('点击了编辑单元格')
    },
    // 点击退出按钮
    out (event) {
      localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang='less' scoped>
/deep/.btnstyle{
background-color: green;
margin: 10px auto;
}
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;

}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70*100vw/360;
    height: 70*100vw/360;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
