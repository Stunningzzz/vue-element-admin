<template>
  <div class="account">
    <el-form>
      <el-form-item label="Name">
        <el-input v-model.trim="user.username"></el-input>
      </el-form-item>
      <el-form-item label="Email">
        <el-input v-model.trim="userAccount.email"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// :value="user.username" @input="$event.target.value === user.username"!!!
export default {
  name: 'ProfileRightTabsAccount',
  props: {
    user: {
      type: Object,
      default() {
        return {
          username: '',
          roles: [],
        };
      },
    },
  },
  data() {
    return {
      userAccount: {
        ...this.user,
        email: `${this.user.roles.join('-')}@test.com`,
      },
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友