<template>
  <div class="articaldetail">
    <!-- 头部 -->
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="follow" :class="{active:news.has_follow}">{{news.has_follow?"已關注":"關注"}}</span>
    </div>
    <!-- 内容 -->
    <div class="detail">
      <div class="title">{{news.title}}</div>
      <div class="desc">
        <span>{{news.user && news.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div class="content" v-html="news.content" v-if="news.type===1"></div>
        <video v-if="news.type===2" :src="news.content" controls :poster="news.cover[0].url"></video>

      <div class="opt">
        <span class="like" :class="{dianzan:news.has_like}" @click="dz">
          <van-icon name="good-job-o" />
          {{news.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部 -->
    <newsfloor :newsdata=news></newsfloor>
  </div>
</template>

<script>
// 引入获取文章详情方法
import { getnews, guanzhu, quguan, dianzan } from '@/api/getnews'
// 引入底部组件
import newsfloor from '@/components/newsfloor'
export default {
  components: {
    newsfloor
  },
  data () {
    return {
      news: []
    }
  },
  async mounted () {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let res = await getnews(this.$route.params.id)
    console.log(res)
    this.news = res.data.data
    console.log(11, this.news)
  },
  methods: {
    async follow () {
      let res
      if (this.news.has_follow === false) {
        res = await guanzhu(this.news.user.id)

        console.log(res)
      } else {
        res = await quguan(this.news.user.id)
        console.log(res)
      }
      this.news.has_follow = !this.news.has_follow
      console.log(this.news.has_follow)
      this.$toast.success(res.data.message)
    },
    // 点赞
    async dz () {
      this.news.has_like = !this.news.has_like
      let res = await dianzan(this.news.id)
      if (res.data.message === '取消成功') {
        this.news.like_length--
      } else {
        this.news.like_length++
      }
      this.$toast.success(res.data.message)
    }

  }
}
</script>

<style lang='less' scoped>
.articaldetail{
  padding-bottom: 50px;
}
.dianzan{
  background: red;
}
video {
  width: 100%;
  margin-bottom: 10px;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ccc;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;

    color: #333;
    border: #333 1px solid;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
/deep/.photo {
  img {
    width: 100% !important;
    display: block;
  }
}
.active{
background: red;
color:white;

}
</style>
