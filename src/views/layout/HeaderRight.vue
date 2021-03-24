<template>
  <div class="header-right">
    <HeaderRightSearch />
    <HeaderRightFullScreen />
    <HeaderRightSizeSelect />
    <HeaderRightAvatarDropDown/>
  </div>
</template>
<script>
import HeaderRightSearch from './HeaderRightSearch';
import HeaderRightFullScreen from './HeaderRightFullScreen';
import HeaderRightSizeSelect from './HeaderRightSizeSelect';
import HeaderRightAvatarDropDown from './HeaderRightAvatarDropDown';

export default {
  name: 'HeaderRight',
  components: {
    HeaderRightSearch,
    HeaderRightFullScreen,
    HeaderRightSizeSelect,
    HeaderRightAvatarDropDown,
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
