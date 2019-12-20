<template>
<div id="app">
    <div class="container">
        <div class="close">
            <span class="iconfont iconicon-test"></span>
            </div>
            <div class="logo">
                <span class="iconfont iconnew"></span>
                </div><div class="inputs">
                   <inp type="text" :value="user.username" @input="getname" :rules=/^1\d{10}$/ msg_err="手机号不合法"></inp>
                   <inp type="password" v-model="user.password" @input="getword"></inp>
                   </div>
                    <p class="tips">
    没有账号？
    <a href="#/register" class="">去注册</a>
    </p>
    <!-- 渲染按钮组件 -->
    <btn :myname="btnname" @click="login"></btn>
    </div></div>
</template>

<script>
// 引入按钮组件
import btn from '@/components/mybutton'
// 引入输入框组件
import inp from '@/components/myinput'
// 引入登录验证
import { userLogin } from '@/api/users.js'
export default {
  data () {
    return {
      btnname: '点击登录',
      user: {
        username: '',
        password: ''
      }

    }
  },

  components: {
    //   注册按钮
    btn, inp

  },
  methods: {
    //   接收按钮组件的点击事件
    login (event) {
      console.log(this.user)
      userLogin(this.user)
        .then(res => {
          if (res.data.message === '登录成功') {
            // 登录成功将token存起来
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('myid', res.data.data.user.id)
            this.$router.push({ path: `/personal/${res.data.data.user.id}` })
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
          this.$toast.fail('登录失败')
        })
    },
    getname (data) {
      this.user.username = data
    },
    getword (data) {
      this.user.password = data
    }
  }
}
</script>

<style lang='less'>
.container {
  padding: 20px;
  height: 100vh;
  background-color: rgb(242,242,242);
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
