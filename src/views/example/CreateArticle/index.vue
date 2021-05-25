<template>
  <div
    class="no-padding"
    v-loading="dataLoading"
  >
    <StickyNavBar
      v-bind.sync="articleData"
      :updating="updating"
      @publish-click="publishClick"
      @draft-click="draftClick"
    />

    <div class="content">
      <aside>
        创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，
        所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，
        可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。
        详情见
        <a
          href="https://panjiachen.github.io/vue-element-admin-site/guide/essentials/tags-view.html"
          target="_blank"
        >Document</a>
      </aside>

      

      <el-form :model="articleData">
        <el-form-item>
          <MDInput
            v-model="articleData.title"
            name="title"
          >
            Title
          </MDInput>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label-width="60px"
              label="Author:"
            >
              <el-select
                v-model="articleData.author"
                :remote-method="getAuthorList"
                filterable
                default-first-option
                remote
                placeholder="Search user"
                :loading="remoteSearching"
                loading-text="加载中..."
              >
                <el-option
                  v-for="(item,index) in authorOptions"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              prop="timestamp"
              label="Publish Time"
            >
              <el-date-picker
                type="datetime"
                v-model="articleData.display_time"
                placeholder="Search user"
                size="small"
              />
            </el-form-item>

          </el-col>

          <el-col :span="8">
            <el-form-item
              prop="importance"
              label="Importance"
            >
              <el-rate
                v-model="articleData.importance"
                :max="3"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          prop="summary"
          label="Summary："
          label-width="70px"
          class="article-textarea"
        >
          <el-input
            type="textarea"
            v-model="articleData.content_short"
            placeholder="Please enter the content"
            :autosize="{minRows:1}"
          />
          <span
            class="word-counter"
            v-show="articleData.content_short.length > 0"
          >{{articleData.content_short.length}} words</span>
        </el-form-item>
      </el-form>

      <TinyMce :value="articleData.content" />

    </div>

  </div>
</template>

<script>
import StickyNavBar from './StickyNavBar';
import MDInput from '@/components/MDInput';
import { searchAuthor } from '@/network/remote-search';
import { fetchArticle, updateArticle } from '@/network/article';
import TinyMce from '@/components/Tinymce';
import { deepClone } from '@/common/utils';

const defaultArticleData = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0,
  status: 'draft',
};

export default {
  name: 'CreateArticle',
  props: ['id'],
  components: {
    StickyNavBar,
    MDInput,
    TinyMce,
  },
  data() {
    return {
      articleData: deepClone(defaultArticleData),
      authorOptions: [],
      fetchAuthorList: null,
      remoteSearching: false,
      dataLoading: false,
      updating: false,
    };
  },
  async created() {
    if (this.id) {
      this.dataLoading = true;
      this.articleData = (await fetchArticle(this.id)).data;
      this.dataLoading = false;
    }
  },
  methods: {
    publishClick() {
      this.updateArticle();
      this.$watch('updating', (newVal) => {
        if (!newVal) {
          this.articleData.status = 'published';
        }
      });
    },
    draftClick() {
      this.updateArticle();
      this.$watch('updating', (newVal) => {
        if (!newVal) {
          this.articleData.status = 'draft';
        }
      });
    },
    async updateArticle() {
      this.updating = true;
      try {
        await updateArticle(this.articleData);
        this.updating = false;
        this.$notify.success({
          title: '成功',
          message: '状态更新成功',
        });
      } catch (error) {
        this.updating = false;
        this.$message({
          type: 'error',
          message: '状态更新失败 请稍后重试',
          duration: 1000,
        });
      }
    },
    async getAuthorList(name) {
      this.remoteSearching = true;
      this.authorOptions = (await searchAuthor(name)).data.items;
      this.remoteSearching = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.content {
  padding: 20px 40px;
  .el-form {
    padding: 20px 0 20px 0;
    .el-rate {
      display: inline-block;
    }
  }
}
::v-deep.article-textarea {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #bfcbd9;
  }
  .word-counter {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
//亲人 爱人 朋友