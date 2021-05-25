<template>
  <StickyComp :sticky-top="stickyTop">
    <div
      class="stikcy-navbar"
      :style="navbarStyle"
    >
      <el-page-header @back="goBack" />

      <div class="navbar-right">
        <el-dropdown trigger="click">
          <el-button size="medium">
            Comment：{{commentStatusText}}
            <i class="el-icon-caret-bottom"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-radio-group
              v-model="curCommentStatusRadio"
              @change="commentStatusChange"
            >
              <el-radio
                v-for="item in commentStatusRadio"
                :key="item.value"
                :label="item"
              >
                {{item.label}}
              </el-radio>
            </el-radio-group>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button size="medium">
            Platforms({{platformStatus.length}})
            <i class="el-icon-caret-bottom"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-checkbox-group
              v-model="platformStatus"
              @change="platformStatusChange"
            >
              <el-checkbox
                v-for="item in platformCheckbox"
                :key="item.value"
                :label="item"
              >
                {{item.label}}
              </el-checkbox>
            </el-checkbox-group>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dropdown trigger="click">
          <el-button size="medium">
            Link
            <i class="el-icon-caret-bottom"></i>
          </el-button>
          <el-dropdown-menu
            slot="dropdown"
            class="link-dropdown-menu"
          >
            <el-input
              :value="source_uri"
              @input="urlChange"
              size="medium"
            >
              <template v-slot:prepend>
                URL
              </template>
            </el-input>
          </el-dropdown-menu>
        </el-dropdown>
        <el-button
          type="success"
          @click="publishClick"
          size="medium"
          :loading="publishLoading"
        >
          Publish
        </el-button>
        <el-button
          type="warning"
          @click="draftClick"
          size="medium"
          :loading="draftLoading"
        >
          Draft
        </el-button>
      </div>
    </div>
  </StickyComp>
</template>

<script>
import StickyComp from '@/components/StickyComp';
export default {
  name: 'StickyNavBar',
  filters: {
    selectedRadioText(val) {
      return val ? 'opened' : 'closed';
    },
  },
  components: {
    StickyComp,
  },
  props: {
    platforms: Array,
    comment_disabled: Boolean,
    source_uri: String,
    status: String,
    updating: Boolean,
  },
  data() {
    return {
      stickyTop: 0,
      commentStatusRadio: [
        {
          label: 'Close Comment',
          value: true,
          text: 'closed',
        },
        {
          label: 'Open Comment',
          value: false,
          text: 'opened',
        },
      ],
      commentStatusText: '',
      curCommentStatusRadio: null,
      platformCheckbox: [
        {
          label: 'a-platform',
          value: 'a-platform',
        },
        {
          label: 'b-platform',
          value: 'b-platform',
        },
        {
          label: 'c-platform',
          value: 'c-platform',
        },
      ],
      platformStatus: [],
      link: '',
      publishLoading: false,
      draftLoading: false,
    };
  },
  computed: {
    navbarStyle() {
      return this.status === 'published'
        ? {
            background:
              'linear-gradient(90deg,#20b6f9,#20b6f9 0,#2178f1 100%,#2178f1 0)',
          }
        : {
            background: '#d0d0d0',
          };
    },
  },
  watch: {
    '$store.getters.fixedHeader': {
      immediate: true,
      handler(newVal) {
        if (this.$el) {
          this.stickyTop = newVal ? this.fixedStickyTop : 0;
        } else {
          this.$nextTick(() => {
            this.fixedStickyTop = this.$el.offsetTop;
            this.stickyTop = newVal ? this.fixedStickyTop : 0;
          });
        }
      },
    },
    comment_disabled(newVal) {
      this.curCommentStatusRadio = this.commentStatusRadio.find(
        (item) => item.value === newVal
      );
      this.commentStatusText = this.curCommentStatusRadio?.text;
    },
    platforms(newVal) {
      this.platformStatus = this.platformCheckbox.filter((checkboxItem) =>
        newVal.find((item) => item === checkboxItem.value)
      );
    },
    updating(newVal) {
      if (!newVal) {
        this.publishLoading = false;
        this.draftLoading = false;
      }
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    publishClick() {
      this.publishLoading = true;
      this.emitEvent('publish-click');
    },
    draftClick() {
      this.draftLoading = true;
      this.emitEvent('draft-click');
    },
    urlChange(newVal) {
      this.emitEvent('update:source_uri', newVal);
    },
    platformStatusChange(newVal) {
      this.emitEvent(
        'update:platforms',
        newVal.map((item) => item.value)
      );
    },
    commentStatusChange(item) {
      this.emitEvent('update:comment_disabled', item.value);
    },
    emitEvent(evName, payload) {
      this.$emit(evName, payload);
    },
  },
};
</script>

<style lang='scss' scoped>
.stikcy-navbar {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 30px;
  .navbar-right {
    &::before {
      content: '';
      height: 100%;
      display: inline-block;
    }
    > .el-button {
      margin-left: 12px;
    }
  }
  .el-dropdown i {
    padding-left: 5px;
  }
}
.el-radio-group,
.el-checkbox-group {
  margin: 0 20px 0 20px;
}
.link-dropdown-menu {
  padding: 0;
  width: 400px;
}
</style>
//亲人 爱人 朋友