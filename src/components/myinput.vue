<template>
  <input type="text"
  class="inp"
  :value="value"
  @input="myinput"
:class="{err:!statu,success:statu}"
@blur="sqjd"
  >
</template>

<script>
// 引入提示框
// import { Toast } from 'vant'
export default {
  data () {
    return {
      statu: false
    }
  },
  props: ['value', 'rules', 'msg_err'],

  methods: {
    myinput (event) {
      let value = event.target.value
      if (this.rules && this.rules.test(value)) {
        this.statu = true
      } else {
        this.statu = false
      }
      this.$emit('input', value)
    },
    sqjd () {
      let value = event.target.value
      if (this.rules && !this.rules.test(value)) {
        this.$toast.fail(this.msg_err)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.inp{

       width: 314*100vw/360;
    height: 40*100vw/360;
      border:none;
    outline: none;
     border-bottom: 2px solid rgb(117,117,117);
    font-size: 18px;
    margin: 5px 0;
    background-color: transparent;
}
.err{
    border-bottom:2px solid red;
}
.success{
       border-bottom:2px solid green;
}
</style>
