<template>
  <h2>
    {{num}}
    <button @click="click">按钮啊啊啊</button>
    <button @click="handleReload">123asd</button>
  </h2>
</template>

<script>
import Child from './Child';
export default {
  name: 'Permission',
  inject:['reload'],
  components: {
    Child,
  },
  data(){
    return {
      num:0
    }
  },
  methods:{
    click(){
      this.num++;
    },
    handleReload(){
      this.reload();
    }
  },
};
</script>

<style lang='scss' scoped>
.display-enter-active,
.display-leave-active {
  transition: all 0.5s;
}
.display-enter,
.display-leave-to {
  opacity: 0.1;
}
</style>
//亲人 爱人 朋友