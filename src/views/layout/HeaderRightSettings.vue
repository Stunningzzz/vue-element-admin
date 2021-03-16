<template>
  <div class="header-right">
    <HeaderRightSearch />
  </div>
</template>
<script>
import HeaderRightSearch from './HeaderRightSearch';
export default {
  name: 'HeaderRightSettings',
  components: {
    HeaderRightSearch,
  },
};
</script>
<style lang='scss' scoped>
.header-right {
  height: 100%;
  &::before {
    height: 100%;
    content: '';
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
