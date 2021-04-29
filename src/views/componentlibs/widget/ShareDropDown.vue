<template>
  <div
    class="share-dropdown"
    :class="{active:isActive}"
  >
    <!-- 不设置为div为了保证nth-type从1开始 -->
    <span
      class="share-dropdown-title"
      @click="isActive = !isActive"
    >
      {{title}}
    </span>
    <div
      class="share-dropdown-item"
      v-for="(item,index) in items"
      :key="index"
    >
      <a
        v-if="item.href"
        target="_blank"
        :href="item.href"
      >
        {{item.title}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: 'Vue',
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
};
</script>

<style lang='scss' scoped>
$n: 6;
$t: 0.1s;

.share-dropdown {
  position: relative;
  &-title {
    display: block;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    color: white;
    background-color: black;
    position: relative;
    z-index: 1;
  }
  &-item {
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    background: #e0e0e0;
    color: #000;
    position: absolute;
    width: 100%;
    transition: transform 0.28s ease;
    &:hover {
      color: white;
      background-color: black;
    }
    @for $i from 1 through $n {
      &:nth-of-type(#{$i}) {
        // 收起时 越近的延迟越小
        transition-delay: ($i - 1) * $t;
        // transform: translateY(-60px);
        transform: translateY(-100%);
      }
    }
  }
  &.active {
    .share-dropdown-item {
      @for $i from 1 through $n {
        &:nth-of-type(#{$i}) {
          // 展开时 越远的延迟越小
          transition-delay: ($n - $i) * $t;
          // transform: translateY(60px * ($i - 1));
          transform: translateY(100% * ($i - 1));
        }
      }
    }
  }
}
</style>
//亲人 爱人 朋友