<template>
  <div class="header-right">
    <HeaderRightSearch />
    <HeaderRightScreenFull />
    <HeaderRightSizeSelect />
  </div>
</template>
<script>
import HeaderRightSearch from './HeaderRightSearch';
import HeaderRightScreenFull from './HeaderRightScreenFull';
import HeaderRightSizeSelect from './HeaderRightSizeSelect';

export default {
  name: 'HeaderRightSettings',
  components: {
    HeaderRightSearch,
    HeaderRightScreenFull,
    HeaderRightSizeSelect,
  },
};
</script>
<style lang='scss' scoped>
::v-deep.header-right {
  height: 100%;
  &::before {
    height: 100%;
    content: '';
    display: inline-block;
    vertical-align: middle;
  }
  .svg-icon {
    cursor: pointer;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: middle;
  }
  > div {
    display: inline-block;
    padding: 0 8px;
  }
}
</style>
