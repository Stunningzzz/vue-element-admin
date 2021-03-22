<template>
  <div
    class="header-avatar"
    @command="handleSelect"
  >
    <el-dropdown trigger="click">
      <div>
        <img :src="avatar" class="user-avatar" />
        <i class="el-icon-caret-bottom" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in operationType"
            :key="item.type"
            :command="item.type"
            :divide="item.divide"
          >
            {{item.type}}
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
      operationType: [
        {
          type: 'Profile',
        },
        {
          type:'DashBoard',
        },
        {
          type:'Github',
        },
        {
          type:'Docs',
        },
        {
          type: 'Log Out',
          divide: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['avatar']),
  },
  methods: {
    handleSelect(operation) {
      console.log(operation);
    },
  },
};
</script>

<style lang='scss' scoped>
.user-avatar{
  width: 40px;
  height: 40px;
  border-radius: 10px;
  vertical-align: middle;
}
[class^=el-icon-]{
  vertical-align: bottom;
  padding-left: 5px;
}
</style>
//亲人 爱人 朋友