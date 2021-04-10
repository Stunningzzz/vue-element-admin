import { debounce } from '@/common/utils';
/** 
 * resize的思路
 *   在mounted函数中调用initListener 在activated中 因为初始化时既调用mounted又调用activated 为了防止重复监听
 *   要判断$_resizeHandler是否已经存在 
 *   在beforeDestroy 和 deactivated 中都调用destroyListener取消监听浏览器的resize事件
 */
export default {
  data() {
    return {
      $_resizeHandler: null,
    };
  },
  watch:{
    // 监听asideNavStatus不好的原因是它改变时关闭动画还没执行完呢
    '$store.getters.asideNavIsCollapsing'(newVal){
      // 需要判断是因为在其他也没里面切换时也会触发
      !newVal && this.$_resizeHandler && this.$_resizeHandler();
    },
  },
  mounted() {
    this.initListener();
  },
  activated() {
    /** 
     * 但是这里为什么需要调用呢? 在activated之前不是一定调用过 mounted吗? 
     * 因为在deactivated里面销毁了!! 所以需要每次activated的时候重新监听!!
     * 另外 因为第一次既会调用mounted又会调用mounted 所以要防止init导致重复监听
     */
    // 第一次是mounted + activated 也就是this.$_resizeHandler存在的情况 存在的话就不需要调用
    // !this.$_resizeHandler && this.initListener();
    // 每次回来都resize一下是因为 在其他界面改变大小的时候已经取消监听了
    // this.resize();
    !this.$_resizeHandler && (this.initListener() || this.resize())
  },
  beforeDestroy() {
    this.destroyListener();
  },
  deactivated() {
    this.destroyListener();
  },
  methods: {
    initListener() {
      // 对resize函数进入防抖处理 $_resizeHandler就是防抖处理后的函数
      this.$_resizeHandler = debounce(() => {
        this.resize();
      }, 100);
      window.addEventListener('resize', this.$_resizeHandler);
    },
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler);
      this.$_resizeHandler = null;
    },
    resize() {
      const { chart } = this;
      chart && chart.resize();
    },
  },
};
