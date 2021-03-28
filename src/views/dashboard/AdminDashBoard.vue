<template>
  <div class="admin-dashboard no-padding">
    <GitHubCorner class="github-corner"/>
  </div>
</template>

<script>
import GitHubCorner from '@/components/common/GitHubCorner';
export default {
  name:'AdminDashBoard',
  components:{
    GitHubCorner,
  },
}
</script>

<style lang='scss' scoped>
  .admin-dashboard{
    position: relative;
    .github-corner{
      position: absolute;
      right:0
    }
  }
</style>
//亲人 爱人 朋友