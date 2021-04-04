<template>
  <div :id="id" />
</template>

<script>
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/i18n/ru-ru';
import '@toast-ui/editor/dist/i18n/ja-jp';
import '@toast-ui/editor/dist/i18n/ko-kr';

import Editor from '@toast-ui/editor';
import defaultOptions from './default-options';


export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default() {
        return 'markdown-editor-' + +new Date();
      },
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    mode: {
      type: String,
      default: 'markdown',
    },
    height: {
      type: String,
      default: '300px',
    },
    language: {
      type: String,
      default: 'en_US', // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  computed: {
    editorOptions() {
      const options = {
        ...defaultOptions,
        ...this.options,
        initialEditType: this.mode,
        height: this.height,
        language: this.language,
      };
      return options;
    },
  },
  watch: {
    value(newValue) {
      newValue !== this.editor.getMarkdown() && this.editor.setMarkdown(newValue);
    },
    language() {
      this.destroyEditor();
      this.initEditor();
    },
    height(newValue) {
      console.log(newValue);
      this.editor.height(newValue);
    },
    mode(newValue) {
      this.editor.changeMode(newValue);
    },
  },
  mounted() {
    this.initEditor();
  },
  destroyed() {
    this.destroyEditor();
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: this.$el,
        ...this.editorOptions,
      });
      if (this.value) {
        this.editor.setMarkdown(this.value);
      }
      this.editor.on('change', () => {
        this.$emit('input', this.editor.getMarkdown());
      });
    },
    destroyEditor() {
      if (!this.editor) return;
      this.editor.off('change');
      this.editor.remove();
    },
    setValue(value) {
      this.editor.setMarkdown(value);
    },
    getValue() {
      return this.editor.getMarkdown();
    },
    setHtml(value) {
      this.editor.setHtml(value);
    },
    getHtml() {
      return this.editor.getHtml();
    },
  },
};
</script>
