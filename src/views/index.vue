<template>
  <div class="index">
    <div class="header">
      <span class="iconfont iconnew icon"></span>
      <div class="center">
        <van-icon name="search" />&nbsp;&nbsp;&nbsp;搜索商品
      </div>
      <van-icon name="manager-o" class="icon" />
    </div>
<van-tabs v-model="active" sticky swipeable>
  <!-- 新闻栏目 -->
  <van-tab :title="value.name" v-for="value in catearr" :key=value.id >

<!-- 下拉刷新 -->
<van-pull-refresh v-model="value.isLoading" @refresh="onRefresh">

<!-- 上拉刷新 -->
<van-list
  v-model="value.loading"
  :finished="value.finished"
  finished-text="没有更多了"
  @load="onLoad"
>

 <!-- 新闻内容 -->
<Mynews v-for="post in value.postlist" :key="post.id" :post="post" ></Mynews>

</van-list>

</van-pull-refresh>
  </van-tab>

</van-tabs>
  </div>
</template>

<script>
import { getCateList } from '@/api/cate.js'
import { Getnewsdata } from '@/api/article'
// 引入新闻块
import Mynews from '@/components/mynews'
export default {
  components: {
    Mynews
  },
  data () {
    return {
      // 如果有登录就显示关注栏目数据否则显示头条页
      active: localStorage.getItem('token') ? 1 : 0,
      catearr: [],
      isLoading: false
    }
  },

  methods: {
    // 封装获取新闻
    async getnews () {
      let res1 = await Getnewsdata(
        {
          pageIndex: this.catearr[this.active].pageIndex,
          pageSize: this.catearr[this.active].pageSize,
          category: this.catearr[this.active].id
        }
      )
      // console.log(res1.data.data)
      this.catearr[this.active].postlist.push(...res1.data.data)

      this.catearr[this.active].loading = false
      if (res1.data.data.length < this.catearr[this.active].pageSize) {
        this.catearr[this.active].finished = true
      }
    },
    // 上拉事件
    onLoad () {
      // 异步更新数据
      // console.log(this.catearr[this.active].loading)
      this.catearr[this.active].pageIndex++

      this.getnews()

      // 加载状态结束
      // this.catearr[this.active].loading = false

      // // 数据全部加载完成
      // if (this.list.length >= 40) {
      //   this.finished = true;
      // }
    },
    onRefresh () {
      // setTimeout(() => {
      //   this.$toast('刷新成功')
      // }, 500)
      // 下拉重置页码
      this.catearr[this.active].pageIndex = 1

      // 重置finished避免无法上拉加载更多
      this.catearr[this.active].finished = false

      // 重置页面数据
      this.catearr[this.active].postlist.length = 0
      // 刷新完成改变isLoading的值
      this.catearr[this.active].isLoading = false
      // 加载页面数据
      this.getnews()
    }

  },

  async mounted () {
    // 获取栏目数据
    let res = await getCateList()
    // console.log(res)
    this.catearr = res.data.data
    // console.log(this.catearr)
    // console.log(this.catearr[this.active])
    // 映射新的数组添加3个属性值
    this.catearr = this.catearr.map(value => {
      return {
        // 拆开之前栏目
        ...value,
        // 新闻数据存放
        postlist: [],
        // 页码
        pageIndex: 1,
        // 每页新闻数量
        pageSize: 5,
        loading: false,
        finished: false,
        isLoading: false
      }
    })

    // 获取新闻数据
    this.getnews()
  },
  // 监听栏目值active变化根据不同栏目填内容
  watch: {
    active () {
      if (this.catearr[this.active].postlist.length === 0) {
        this.getnews()
      }
    }
  }

}
</script>

<style lang='less' scoped>
.index {
  .header {
    height: 50 * 100vw/360;
    display: flex;
    justify-content: space-between;
    background-color: #f00;
    align-items: center;
    color: #fff;
    .icon {
      font-size: 25px;
      padding: 0 10px;
    }
    .iconnew {
      font-size: 60px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background-color: rgba(255, 255, 255, 0.5);
      text-align: center;
      border-radius: 20px;
    }
  }
}
</style>
