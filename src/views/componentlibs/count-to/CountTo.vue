<template>
  <div class="count-to">
    <CountTo
      :start-val="startVal"
      :end-val="endVal"
      :duration="duration"
      :decimals="decimals"
      :separator="separator"
      :prefix="prefix"
      :suffix="suffix"
      :autoplay="autoplay"
      :use-easing="useEasing"
      class="display"
      ref="count"
    >
    </CountTo>
    <div
      class="setting-item"
      v-for="item in settingItems"
      :key="item.label"
    >
      <div class="label">
        {{item.label}}
      </div>
      <el-input-number
        v-if="item.inputType === 'inputNumber' "
        v-model="_self[item.modelData]"
        size="mini"
        :min="item.min"
        :max="item.max"
      >
      </el-input-number>
      <el-input
        v-else-if="item.inputType === 'input' "
        v-model="_self[item.modelData]"
        size="mini"
      >
      </el-input>
      <el-switch
        v-else
        v-model="_self[item.modelData]"
      >
      </el-switch>
    </div>

    <el-button
      class="function-btn function-start"
      @click.native="startCount"
    >Start</el-button>
    <el-button
      class="function-btn function-pause-resume"
      @click.native="pauseCount"
    >Pause/Resume</el-button>
  </div>
</template>

<script>
import CountTo from 'vue-count-to';

export default {
  name: 'CountToDemo',
  components: { CountTo },
  data() {
    return {
      startVal: 0,
      endVal: 2017,
      duration: 4000,
      decimals: 0,
      separator: ',',
      prefix: '¥ ',
      suffix: ' rmb',
      autoplay: true,
      useEasing: true,
      settingItems: [
        {
          label: 'startVal',
          modelData: 'startVal',
          inputType: 'inputNumber',
        },
        {
          label: 'endVal',
          modelData: 'endVal',
          inputType: 'inputNumber',
        },
        {
          label: 'duration',
          modelData: 'duration',
          inputType: 'inputNumber',
          min: 0,
        },
        {
          label: 'decimals',
          modelData: 'decimals',
          inputType: 'inputNumber',
          min: 0,
          max: 20,
        },
        {
          label: 'separator',
          modelData: 'separator',
          inputType: 'input',
        },
        {
          label: 'prefix',
          modelData: 'prefix',
          inputType: 'input',
        },
        {
          label: 'suffix',
          modelData: 'suffix',
          inputType: 'input',
        },
       
      ],
    };
  },
  methods: {
    startCount() {
      this.$refs.count.start();
    },
    pauseCount() {
      let {count} = this.$refs;
      count.pauseResume();
    },
  },
};
</script>

<style lang="scss" scoped>
.count-to {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  .display {
    width: 100%;
    margin: 30px 0;
    line-height: 100px;
    color: #f6416c;
    font-size: 80px;
    margin-bottom: 30px;
  }
  .setting-item {
    width: 25%;
    margin-bottom: 20px;
    .el-input {
      width: 30%;
    }
    .label {
      font-size: 20px;
      color: #949494;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  .function-btn {
    text-align: center;
    font-weight: bolder;
    border: 1px solid rgb(146, 146, 146);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    line-height: 40px;
    font-size: 20px;
    padding: 3px 15px;
    margin-top: 15px;
    width: 30%;
  }
  .function-start {
    $foregroundColor:#30b08f;
    color: $foregroundColor;
    border-color: $foregroundColor;
    &:hover {
      background-color: rgba($color: $foregroundColor, $alpha: 0.7);
      color: #fff;
    }
    &:active {
      transition-duration: 0.1s;
      background-color: rgba($color: $foregroundColor, $alpha: 1);
    }
  }
  .function-pause-resume {
    $foregroundColor:#e65d6e;
    color: $foregroundColor;
    border-color: $foregroundColor;
    &:hover {
      background-color: rgba($color: $foregroundColor, $alpha: 0.7);
      color: #fff;
    }
    &:active {
      transition-duration: 0.1s;
      background-color: rgba($color: $foregroundColor, $alpha: 1);
    }
  }
}
</style>

