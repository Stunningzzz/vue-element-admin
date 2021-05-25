<script>
export default {
  name: 'AsideNavRecurItemTitle',
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    let { icon, title } = context.props;
    const vnodes = [];
    if (icon.startsWith('el-icon')) {
      vnodes.push(<i class={icon}></i>);
    } else {
      vnodes.push(<svg-icon icon-class={icon}></svg-icon>);
    }

    if (title) {
      vnodes.push(<span slot="title">{ title }</span>);
    }

    return vnodes;
  },
};
</script>

<style lang='scss' scoped>
.svg-icon,
[class^='.el-icon'] {
  vertical-align: middle;
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 12px;
}
</style>
//亲人 爱人 朋友