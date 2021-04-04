<template>
  <div>
    <aside>Markdown is based on
      <a
        href="https://github.com/nhnent/tui.editor"
        target="_blank"
      >tui.editor</a> ，simply wrapped with Vue.
      <a
        target="_blank"
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/markdown-editor.html"
      >
        Documentation </a>
    </aside>

    <div class="editor-container">
      <el-tag class="tag-title">
        Basic:
      </el-tag>
      <markdown-editor
        v-model="content1"
        height="500px"
      />
    </div>

    <div class="editor-container">
      <el-tag class="tag-title">
        I18n:
      </el-tag>
      <el-alert
        :closable="false"
        title="You can change the language of the admin system to see the effect"
        type="success"
      />
      <markdown-editor
        ref="markdownEditor"
        v-model="content2"
        :language="languageSet[languageSetIndex]"
        :height="i18nHeight"
      />
    </div>
    <el-row>
      <el-col :span="4">
        <el-button
          type="primary"
          @click="languageSetIndex = (languageSetIndex + 1) % languageSet.length"
        >
          Change Language
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-input
          type="primary"
          v-model="inputHeight"
        >
        <template #append>px</template>
        </el-input>

      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          @click="setHeight"
        >
          Set Height
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          icon="el-icon-document"
          @click="getHtml"
        >
          Get HTML
        </el-button>
      </el-col>
    </el-row>
    <div v-html="html" />
  </div>
</template>

<script>
import MarkdownEditor from './TuiEditor/index';

const content = `
**This is test**

* vue
* element
* webpack

`;
export default {
  name: 'Markdown',
  components: { MarkdownEditor },
  data() {
    return {
      content1: content,
      content2: content,
      html: '',
      languageSet: ['zh-CN', 'ko', 'ja', 'ru'],
      languageSetIndex: 0,
      inputHeight: '',
      i18nHeight: '300px',
    };
  },

  methods: {
    setHeight(){
      this.i18nHeight = this.inputHeight + 'px';
      this.inputHeight = '';
    },
    getHtml() {
      this.html = this.$refs.markdownEditor.getHtml();
    },
  },
};
</script>

<style scoped>
.editor-container {
  margin-bottom: 30px;
}
.tag-title {
  margin-bottom: 5px;
}
</style>
