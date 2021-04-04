<template>
  <div>
    <p>Your roles:{{roles}}</p>
    Switch roles:
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'SwitchRoles',
  inject:['reload'],
  computed:{
    ...mapGetters(['roles']),
    switchRoles:{
      get(){
        return this.roles[0];
      },
      async set(newRole){
        await this.$store.dispatch('user/changeRoles',newRole);
        this.$emit('change');
        this.reload();
      }
    }
  },
};
</script>

<style lang='scss' scoped>
  p{
    margin-top: 0;
  }
</style>
//亲人 爱人 朋友