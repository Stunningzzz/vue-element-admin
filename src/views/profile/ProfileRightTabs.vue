<template>
 
</template>

<script>

export default {
  name: 'ProfileRightTabs',
  components:{
    ProfileRightTabsActivity,
    ProfileRightTabsTimeline,
    ProfileRightTabsAccount
  },
  computed:{
    ...mapGetters(['username','roles']),
    user(){
      return {
        username:this.username,
        roles:this.roles,
      }
    }
  },
};
</script>

<style lang='scss' scoped>

</style>
//亲人 爱人 朋友