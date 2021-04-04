<template>
  <component :is="currentRole" />
</template>

<script>
import AdminDashBoard from './admindashboard/AdminDashBoard';
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
  watch: {
    // val如果有 '__ob__' 属性代表了什么? 代表调用过 new Observer(val)
    // 如果是数组 说明该数组是响应式的 在通过push和$set修改时会通知Watcher
    // 如果是对象 那么表示它的所有子属性都是响应式的  在修改其子属性时会通知Watcher
    roles(newVal) {
      this.currentRole = newVal.includes('admin')
        ? 'AdminDashBoard'
        : 'EditorDashBoard';
    },
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