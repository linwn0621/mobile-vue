<template>
<div class="cell" @click="bianji">
<div class="left">{{leftname}}</div>
<div class="right">{{rightname}}
    <van-icon name="arrow" />
</div>
</div>
</template>

<script>
export default {
  props: ['leftname', 'rightname'],
  methods: {
    bianji (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="less" scoped>
.cell{
    height: 60*100vw/360;
    display:flex;
     justify-content: space-between;
     border-bottom: 1px solid #ccc;
     align-items: center;
margin: auto 10*100vw/360;
}
</style>
