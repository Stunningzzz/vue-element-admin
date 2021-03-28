<template>
  <div>
    <aside>
      <a
        href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/icon.html"
        target="_blank"
      >
        Add and Use
      </a>
    </aside>
    <el-tabs type="border-card">
      <el-tab-pane label="Svg Image Icons">
        <div
          v-for="item in SvgIcons"
          :key="item.icon"
          class="icon-item"
        >
          <el-tooltip :content="item.text">
            <div
              class="icon-wrapper"
              @click="handleCopy(item.text,$event)"
              ref="wrapper"
            >
              <svg-icon :icon-class="item.icon">
              </svg-icon>
              <div class="icon-text">
                {{item.icon}}
              </div>
            </div>
          </el-tooltip>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// 是一个数组 里面包含了所有图标的名称
import SvgIcons from './svg-icons.js';
import ElementIcons from './element-icons.js';
import handleClipboard from '@/common/clipboard';
export default {
  name: 'Icons',
  data() {
    return {
      SvgIcons: SvgIcons.map((icon) => {
        return {
          icon,
          text: `<svg-icon icon-class="${icon}" />`,
        };
      }),
      ElementIcons: ElementIcons.map((icon) => {
        return {
          icon,
          text: `<i class="el-icon-${icon}" />`,
        };
      }),
    };
  },
  methods: {
    handleCopy(text,event) {
      handleClipboard(text,event);
    },
  },
  filters: {
    getClipBoardTextFromIcon(icon) {
      return;
    },
  },
};
</script>

<style lang='scss' scoped>
.el-tab-pane {
  display: flex;
  flex-wrap: wrap;
  .icon-item {
    width: 12.5%;
    // 不设置flex-grow是为了不让最后一行的元素撑满
    // flex-grow: 1;
    height: 125px;
    text-align: center;
    position: relative;
  }
  .icon-wrapper {
    position: absolute;
    // 如果不left:0是相对于content-box 但是width:100%的宽度是padding-box 设置left:0是为了让wrapper的左上角和
    // item的左上角重合
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .icon-text {
    margin-top: 10px;
    font-size: 17px;
    white-space: nowrap;
  }
  .svg-icon {
    font-size: 30px;
  }
}
</style>
//亲人 爱人 朋友