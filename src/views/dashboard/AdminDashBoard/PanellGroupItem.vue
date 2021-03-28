<template>
  <div
    class="panel-item"
    :class="{'is-active':item.itemClass === activeItem.class}"
    @click="handleClick(item.itemClass)"
  >
    <div :class="`panel-icon icon-${item.itemClass}`">
      <svg-icon :icon-class="item.itemClass"></svg-icon>
    </div>
    <div class="panel-text">
      <div class="panel-text-desc">
        {{item.itemDesc}}
      </div>
      <div class="panel-text-num">
        {{item.itemNum}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanellGroupItem',
  inject: ['activeItem'],
  props: {
    item: {
      type: Object,
      required: true,
    },
    activeItem: String,
  },
  methods: {
    handleClick(itemClass) {
      this.activeItem.class = itemClass;
    },
  },
};
</script>

<style lang='scss' scoped>
.icon-peoples {
  .svg-icon {
    color: #40c9c6;
  }
  .panel-item:hover &,
  .panel-item.is-active &  {
    background-color: #40c9c6;
    .svg-icon {
      color: #fff;
    }
  }
}
.icon-message {
  .svg-icon {
    color: #36a3f7;
  }
  .panel-item:hover &,
  .panel-item.is-active & {
    background-color: #36a3f7;
    .svg-icon {
      color: #fff;
    }
  }
}
.icon-money {
  .svg-icon {
    color: #f4516c;
  }
  .panel-item:hover &,
  .panel-item.is-active &  {
    background-color: #f4516c;
    .svg-icon {
      color: #fff;
    }
  }
}
.icon-shopping {
  .svg-icon {
    color: #34bfa3;
  }
  .panel-item:hover &,
  .panel-item.is-active &  {
    background-color: #34bfa3;
    .svg-icon {
      color: #fff;
    }
  }
}
.panel-item {
  width: 22%;
  display: flex;
  background-color: #fff;
  padding: 14px;
  padding-right: 25px;
  justify-content: space-between;
  border-radius: 10px;
  cursor: pointer;
  .panel-icon {
    padding: 16px;
    border-radius: 6px;
    transition: all 0.38s ease-out;
    .svg-icon {
      font-size: 48px;
    }
  }
  .panel-text {
    padding: 10px 0;
    font-weight: bold;
    color: #666;
    .panel-text-desc {
      line-height: 32px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
    }
    .panel-text-num {
      font-size: 20px;
    }
  }
}
</style>
//亲人 爱人 朋友