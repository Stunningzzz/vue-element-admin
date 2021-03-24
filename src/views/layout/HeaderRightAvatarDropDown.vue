<template>
  <div class="header-avatar">
    <el-dropdown
      trigger="click"
      size="small"
    >
      <div>
        <img
          :src="avatar"
          class="user-avatar"
        />
        <i class="el-icon-caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/profile">
            <el-dropdown-item>
              Profile
            </el-dropdown-item>
          </router-link>
          <router-link to="/dashboard">
            <el-dropdown-item>
              Dashboard
            </el-dropdown-item>
          </router-link>
          <a
            :href="githubHref"
            target="_blank"
          >
            <el-dropdown-item>
              Github
            </el-dropdown-item>
          </a>
          <a
            :href="docsHref"
            target="_blank"
          >
            <el-dropdown-item>
              Docs
            </el-dropdown-item>
          </a>
          <el-dropdown-item
            @click.native="logout"
            divided
          >
            Log Out
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'HeaderRightAvatarDropDown',
  data() {
    return {
      githubHref: 'https://github.com/myLYQ/vue-element-my-admin',
      docsHref: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    };
  },
  computed: {
    ...mapGetters(['avatar']),
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    
  },
};
</script>

<style lang='scss' scoped>
.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  vertical-align: middle;
}
[class^='el-icon-'] {
  vertical-align: bottom;
  padding-left: 5px;
}
</style>
//亲人 爱人 朋友