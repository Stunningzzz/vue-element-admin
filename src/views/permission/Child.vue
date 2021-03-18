<template>
  <h2 v-show="isShow">
    ask打卡烧烤店看看
    <button @click="click">安安安你</button>
  </h2>
</template>

<script>
export default {
  name:'Child',
  data(){
    return {
      isShow:true
    }
  },
  methods:{
    click(){
      this.isShow = !this.isShow;
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
//亲人 爱人 朋友