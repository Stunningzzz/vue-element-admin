<template>
  <div class="mixin-components">
    <el-card
      class="box-card"
      header="buttons"
    >
      <div class="btns-container">
        <router-link
          class="line-transition-btn gray-btn"
          to="./richText"
        >
          RichText
        </router-link>
        <router-link
          class="line-transition-btn blue-btn"
          to="./markdown"
        >
          Markdown
        </router-link>
        <router-link
          class="line-transition-btn red-btn"
          to="./upload"
        >
          Upload
        </router-link>
        <router-link
          class="line-transition-btn green-btn"
          to="./dropzone"
        >
          Dropzone
        </router-link>
        <router-link
          class="line-transition-btn cyan-btn"
          to="./sticky"
        >
          Sticky
        </router-link>
        <router-link
          class="line-transition-btn yellow-btn"
          to="./count-to"
        >
          Count to
        </router-link>
      </div>

    </el-card>

    <!-- <el-row
      :gutter="20"
      style="margin-top:50px;"
    >
      <el-col :span="6">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>Material Design 的input</span>
          </div>
          <div style="height:100px;">
            <el-form
              :model="demo"
              :rules="demoRules"
            >
              <el-form-item prop="title">
                <md-input
                  v-model="demo.title"
                  icon="el-icon-search"
                  name="title"
                  placeholder="输入标题"
                >
                  标题
                </md-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>图片hover效果</span>
          </div>
          <div class="component-item">
            <pan-thumb
              width="100px"
              height="100px"
              image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191"
            >
              vue-element-admin
            </pan-thumb>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>水波纹 waves v-directive</span>
          </div>
          <div class="component-item">
            <el-button
              v-waves
              type="primary"
            >
              水波纹效果
            </el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>hover text</span>
          </div>
          <div class="component-item">
            <mallki
              class-name="mallki-text"
              text="vue-element-admin"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      style="margin-top:50px;"
    >
      <el-col :span="8">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>Share</span>
          </div>
          <div
            class="component-item"
            style="height:420px;"
          >
            <dropdown-menu
              :items="articleList"
              style="margin:0 auto;"
              title="系列文章"
            />
          </div>
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import RotateAvatar from '@/components/RotateAvatar';
import TextHoverAnimation from '@/components/TextHoverAnimation';
import MdInput from './MdInput';
import DropdownMenu from './DropdownMenu';
import waves from '@/directives/waves/index.js'; // 水波纹指令

export default {
  name: 'ComponentMixinDemo',
  components: {
    RotateAvatar,
    TextHoverAnimation,
    MdInput,
    DropdownMenu,
  },
  directives: {
    waves,
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error('请输入六个字符'));
      } else {
        callback();
      }
    };
    return {
      demo: {
        title: '',
      },
      demoRules: {
        title: [{ required: true, trigger: 'change', validator: validate }],
      },
      articleList: [
        {
          title: '基础篇',
          href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2',
        },
        {
          title: '登录权限篇',
          href: 'https://juejin.im/post/591aa14f570c35006961acac',
        },
        {
          title: '实战篇',
          href: 'https://juejin.im/post/593121aa0ce4630057f70d35',
        },
        {
          title: 'vue-admin-template 篇',
          href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56',
        },
        {
          title: 'v4.0 篇',
          href: 'https://juejin.im/post/5c92ff94f265da6128275a85',
        },
        {
          title: '优雅的使用 icon',
          href: 'https://juejin.im/post/59bb864b5188257e7a427c09',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.mixin-components {
  background-color: #f0f2f5;
  .btns-container {
    display: flex;
    justify-content: space-around;
    .line-transition-btn {
      font-size: 14px;
      color: #fff;
      padding: 14px 36px;
      border-radius: 8px;
      transition: all 0.6s ease;
      position: relative;
      display: inline-block;
      $gray: #324157;
      $blue: #3a71a8;
      $red: #e65d6e;
      $green: #30b08f;
      $cyan: #4ab7bd;
      $yellow: #fec171;
      &.gray-btn {
        background-color: $gray;
        &::before {
          position: absolute;
          content: '';
          right: 0;
          top: 0;
          width: 0;
          transition: 400ms ease all;
          border-top: 2px solid $gray;
        }
        &::after {
          position: absolute;
          content: '';
          left: 0;
          bottom: 0;
          width: 0;
          transition: 400ms ease all;
          border-top: 2px solid $gray;
        }
        &:hover {
          background-color: #fff;
          color: $gray;
          &::before,&::after {
            width:100%;
          }
        }
      }
      &.blue-btn {
        background-color: $blue;
      }
      &.red-btn {
        background-color: $red;
      }
      &.green-btn {
        background-color: $green;
      }
      &.cyan-btn {
        background-color: $cyan;
      }
      &.yellow-btn {
        background-color: $yellow;
      }
    }
  }
}
</style>
