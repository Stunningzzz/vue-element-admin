<template>
  <component :is="currentRole" />
</template>

<script>
import AdminDashBoard from './AdminDashBoard/index';
import EditorDashBoard from './EditorDashBoard';
import { mapGetters } from 'vuex';

export default {
  name: 'DashBoard',
  components: {
    AdminDashBoard,
    EditorDashBoard,
  },
  data() {
    return {
      currentRole: 'AdminDashBoard',
    };
  },
  computed: {
    ...mapGetters(['roles']),
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'EditorDashBoard';
    }
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友