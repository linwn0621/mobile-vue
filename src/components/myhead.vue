<template>
  <div class="header">
      <span>
          <slot name="left"></slot>
      </span>
      <span class="title">{{title}}</span>
      <span>
          <slot  name="right"></slot>
      </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
.header{display: flex;
    justify-content: space-between;
 height: 46*100vw/360;
     padding: 0 10*100vw/360;
      align-items: center;
        .title {
        font-weight: 700;
    }
    }

</style>
