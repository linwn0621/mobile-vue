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
  <van-tab :title="value.name" v-for="value in catearr" :key=value.id >

<Mynews v-for="post in value.postlist" :key="post.id" :post="post" ></Mynews>
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
      catearr: []
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
      console.log(res1)
      this.catearr[this.active].postlist = res1.data.data
      console.log(this.catearr)
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
        pageSize: 5
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
