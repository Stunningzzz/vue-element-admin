<template>
  <div
    :class="{fullscreen:fullscreen}"
    class="tinymce-container"
  >
    <textarea
      :id="tinymceId"
      class="tinymce-textarea"
    />
    <div class="editor-custom-btn-container">
      <editorImage
        color="#1890ff"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      />
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './EditorImage';
import plugins from './plugins';
import toolbar from './toolbar';
import load from './dynamicLoadScript';

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN =
  'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js';

export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    tinymceId: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date();
      },
    },
    value: {
      type: String,
      default: '',
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table',
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360,
    },
  },
  data() {
    return {
      tinymce: {},
      fullscreen: false,
      languageTypeList: {
        en: 'en',
        zh: 'zh_CN',
        es: 'es_MX',
        ja: 'ja',
      },
    };
  },
  watch: {
    value(newVal) {
      // 如果发现内外的内容不同步 那么设置tinymce的内容使同步
      if (this.getContent() !== newVal) {
        this.setContent(newVal);
      }
    },
  },
  mounted() {
    window.tinymce
      ? this.initTinymce()
      : load(tinymceCDN, (err) => {
          if (err) {
            this.$message.error(err.message);
            return;
          }
          this.initTinymce();
        });
  },
  activated() {
    window.tinymce && this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
      window.tinymce
        .init({
          selector: `#${this.tinymceId}`, // 容器
          language: this.languageTypeList['en'], // 设置语言
          height: this.height, // 高度
          body_class: 'panel-body ', // 给iframe生成的body添加的类名
          object_resizing: false, // 关闭图片、表格、媒体对象在编辑区内的调整大小工具
          toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar, // 工具栏
          menubar: this.menubar, // 菜单栏
          plugins: plugins, // 插件
          end_container_on_empty_block: true, // 如果设为true，在空的元素中按下回车键将拆分该元素
          powerpaste_word_import: 'clean',
          code_dialog_height: 450, // 配置对话框的宽高
          code_dialog_width: 1000, // 配置对话框的宽高
          advlist_bullet_styles: 'square', // 设置无序列表前面的小点的样式
          advlist_number_styles: 'default', // 设置有序列表前面为数字
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'], // 开启图片跨域白名单
          default_link_target: '_blank', // 默认打开操链接的方式
          link_title: false, // 对话框中“标题”的显示开关
          nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
          // 初始化结束后执行
          init_instance_callback: (editor) => {
            // 如果默认内容不为空就设置上
            if (_this.value) {
              editor.setContent(_this.value);
            }
            /**
             * NodeChange Change KeyUp 主要负责键盘输入 以及 查找替换等方式进行的内容修改
             * 而 SetContent 是通过调用方法进行的内容修改
             */
            editor.on('NodeChange Change KeyUp SetContent', (e) => {
              this.$emit('input', editor.getContent());
            });
            // 监听当前是否是全屏状态并修改变量  通过tinymce监听的事件的 e.type 都表示事件名
            editor.on('FullscreenStateChanged', (e) => {
              _this.fullscreen = e.state;
            });
          },

          /**
           * 关闭此选项，TinyMCE将不会自动处理URL，也就是说，插入的URL原本是什么就是什么，
           * 不会自动转换相对或绝对路径，这样会导致内容URL极其混乱。所以，默认此选项是开启的。
           */
          convert_urls: false,
        })
        .then(([tinymce]) => {
          this.tinymce = tinymce;
        });
    },
    destroyTinymce() {
      let { tinymce } = this;
      if (tinymce) {
        if (this.fullscreen) {
          tinymce.execCommand('mceFullScreen');
        }
        tinymce.destroy();
      }
    },
    setContent(value = '') {
      this.tinymce.setContent(value);
    },
    getContent() {
      return this.tinymce.getContent();
    },
    imageSuccessCBK(fileList) {
      fileList.forEach(({ url }) => {
        this.tinymce.insertContent(`<img class="wscnph" src="${url}" />`);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}
</style>
