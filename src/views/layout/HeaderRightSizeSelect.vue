<template>
  <div class="header-sizeselect">
    <el-dropdown
      trigger="click"
      @command="handleSelect"
      size="mini"
      @visible-change="toggleTooltip"
    >
      <div>
        <el-tooltip :content="tooltip" :disabled="isVisible" :key="isVisible">
          <svg-icon icon-class="size" />
        </el-tooltip>
      </div>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item
          v-for="option in sizeOptions"
          :key="option.value"
          :disabled="globalSize === option.value"
          :command="option.value"
        >
          {{option.label}}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'HeaderRightGlobalSize',
  data() {
    return {
      tooltip: 'global size',
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' },
      ],
      isVisible:false,
    };
    
  },
  mounted(){
  },
  computed: {
    ...mapGetters(['globalSize']),
  },
  methods: {
    ...mapMutations('app', ['setGlobalSize']),
    handleSelect(size) {
      this.$ELEMENT.size = size;
      this.reload();
      this.setGlobalSize(size);
      this.$nextTick(() => {
        this.$message({
          message: 'Switch Size Success',
          type: 'success',
        });
      });
    },
    reload(){
      this.$bus.$emit('reload');
    },
    toggleTooltip(isVisible){
      this.isVisible = isVisible;
    }
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友