<template>
  <div class="profile">
    <el-row :gutter="20">
      <el-col :span="6">
        <ProfileLeftAboutMe :user="user" />
      </el-col>

      <el-col :span="18">
        <el-card class=" text-muted">
          <el-tabs class="tabs">
            <el-tab-pane label="Activity">
              <ProfileRightTabsActivity />
            </el-tab-pane>
            <el-tab-pane label="Timeline">
              <ProfileRightTabsTimeline />
            </el-tab-pane>
            <el-tab-pane label="Account">
              <ProfileRightTabsAccount :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// v-model props中的属性 :username="user.username" @input="user.username = $event.target.value"
import ProfileLeftAboutMe from './ProfileLeftAboutMe';
import ProfileRightTabsActivity from './ProfileRightTabsActivity';
import ProfileRightTabsTimeline from './ProfileRightTabsTimeline';
import ProfileRightTabsAccount from './ProfileRightTabsAccount';
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  components: {
    ProfileLeftAboutMe,
    ProfileRightTabsActivity,
    ProfileRightTabsTimeline,
    ProfileRightTabsAccount,
  },
  data() {
    console.log('this --- ', this);
    return {
      user: {},
    };
  },
  computed: {
    ...mapGetters(['username', 'roles', 'avatar']),
  },
  created() {
    let { username, roles, avatar } = this;
    this.user = {
      username,
      roles,
      avatar,
    };
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友