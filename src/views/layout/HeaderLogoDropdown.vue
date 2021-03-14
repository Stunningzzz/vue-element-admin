<template>
  <div class="header-right">
    <div v-loading="isLoading"></div>
    <el-dropdown size="medium">
      <span class="el-dropdown-link">
        <img
          src="~@/assets/img/logo.svg"
          class="header-logo"
        />
        <!-- <img src="~assets/img/logo-small.svg" /> -->
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/">
            首页
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  name: 'HeaderLogoDropdown',
  props: {
    isLoading: true,
  },
  methods: {
    logout(){
      this.$store.dispatch('user/logout')
      .then(data => {
        this.$router.push('/login');
      })
    }
  },
};
</script>
<style lang='scss' scoped>
::v-deep.header-right {
  display: inline-flex;
  .circular {
    width: 20px;
  }
  .el-icon-arrow-down {
    color: #409eff;
  }
  .header-logo {
    vertical-align: -10px;
  }
}

.el-dropdown-menu--medium .el-dropdown-menu__item {
  text-align: center;
  a {
    display: block;
    width: 100px;
    line-height: 3;
  }
}
.el-dropdown {
  margin-left: 32px;
}
.header-logo:hover {
  background-color: transparent !important;
  color: inherit !important;
}
</style>
