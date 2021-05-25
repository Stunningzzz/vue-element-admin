<template>
  <div class="mixin-components">
    <el-card
      class="box-card"
      header="Components Library"
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

    <div class="components-row2">
      <el-card header="Material Design's Input">
        <div class="mdinput-container">
          <el-form
            :model="demo"
            :rules="demoRules"
          >
            <el-form-item prop="title">
              <MDInput
                v-model="demo.title"
                icon="el-icon-search"
                name="title"
                placeholder="输入标题"
              >
                标题
              </MDInput>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <el-card header="图片hover旋转">
        <div class="rotate-avatar-container">
          <div class="rotate-avatar-text">
            Now You Can See Me!!!
          </div>
          <RotateAvatar :avatar-url="avatarUrl" />
        </div>
      </el-card>

      <el-card header="按钮点击水波纹效果">
        <div class="waves-btn">
          <el-button
            v-waves
            type="primary"
            size="medium"
            :style="{position:'relative'}"
          >
            水波纹效果
          </el-button>
        </div>
      </el-card>

      <el-card header="Text-Hover-Animation">
        <div class="text-hover-animation-container">
          <TextHoverAnimation
            class-name="mallki-text"
            text="Now-You-Can-See-Me!!!"
          />
        </div>
      </el-card>
    </div>

    <div class="components-row3">
      <el-card
        class="dropdown-container"
        header="分享"
      >
        <DropdownMenu
          :items="articleList"
          title="系列文章"
        />
      </el-card>
    </div>
  </div>
</template>

<script>
import RotateAvatar from '@/components/RotateAvatar';
import MDInput from '@/components/MDInput';
import TextHoverAnimation from '@/components/TextHoverAnimation';
import DropdownMenu from './ShareDropDown';
import waves from '@/directives/waves/index.js'; // 水波纹指令

export default {
  name: 'Widget',
  components: {
    MDInput,
    RotateAvatar,
    TextHoverAnimation,
    DropdownMenu,
  },
  directives: {
    waves,
  },
  data() {
    const validate = (rule, value, callback) => {
      if (value.length !== 6) {
        callback('请输入六个字符');
      } else {
        callback();
      }
    };
    return {
      avatarUrl:
        'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
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
      &::before,
      &::after {
        position: absolute;
        content: '';
        width: 0;
        transition: 400ms ease all;
      }
      @mixin hoverTransition($curCol) {
        background-color: $curCol;
        &::before {
          border-top: 2px solid $curCol;
          right: 0;
          top: 0;
        }
        &::after {
          border-top: 2px solid $curCol;
          left: 0;
          bottom: 0;
        }
        &:hover {
          background-color: #fff;
          color: $curCol;
          &::before,
          &::after {
            width: 100%;
          }
        }
      }
      $gray: #324157;
      $blue: #3a71a8;
      $red: #e65d6e;
      $green: #30b08f;
      $cyan: #4ab7bd;
      $yellow: #fec171;
      &.gray-btn {
        @include hoverTransition($gray);
      }
      &.blue-btn {
        @include hoverTransition($blue);
      }
      &.red-btn {
        @include hoverTransition($red);
      }
      &.green-btn {
        @include hoverTransition($green);
      }
      &.yellow-btn {
        @include hoverTransition($yellow);
      }
      &.cyan-btn {
        @include hoverTransition($cyan);
      }
    }
  }

  .components-row2 {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    ::v-deep.el-card {
      width: 23%;
      .el-card__body {
        padding-top: 10px;
        // 总高度是200 header占了55px
        height: 200px - 55px;
        position: relative;
        > div {
          position: absolute;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
        }
      }
    }
    .mdinput-container {
      width: 80% !important;
    }
    .rotate-avatar-container {
      position: relative;
      display: inline-block;
      .rotate-avatar-text {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        text-align: center;
        border: 5px solid #f2f2f2;
        padding: 10px;
        padding-top: 15px;
        line-height: 20px;
      }
      .rotate-avatar {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
    .text-hover-animation-container {
      white-space: nowrap;
    }
  }
  .components-row3 {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    ::v-deep.el-card {
      width: 30%;
      .el-card__body {
        padding-top: 10px;
        // 总高度是200 header占了55px
        height: 470px;
      }
    }
  }
}
</style>
