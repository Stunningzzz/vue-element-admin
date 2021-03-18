<template>
  <div class="header-sizeselect">
    <svg-icon icon-class="size" @click="handleSetSize"/>
  </div>
</template>

<script>
export default {
  name:'HeaderRightGlobalSize',
  methods:{
    handleSetSize(){
      this.$bus.$emit('reload')
    }
  },
}
</script>

<style lang='scss' scoped>

</style>
//亲人 爱人 朋友