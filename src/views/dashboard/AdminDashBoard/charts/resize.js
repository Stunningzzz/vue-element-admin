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
    // avoid duplication init
    !this.$_resizeHandler && this.initListener();
    // when keep-alive chart activated, auto resize
    this.resize();
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
