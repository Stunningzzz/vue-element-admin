
<script>
import QRCode from '@/assets/img/QRCode.png';
import { getUserInfo } from '@/common/storage';
export default {
  name: 'Login',
  data() {
    const validatorUsername = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('用户名必须大于等于5'));
      } else {
        callback();
      }
    };
    const validatorPassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码的长度必须大于等于5'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', validator: validatorUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatorPassword },
        ],
      },
      inputType: 'password',
      isLoading: false,
    };
  },
  computed: {
    toolTipContent() {
      return this.inputType === 'text' ? '隐藏密码' : '显示密码';
    },
  },
  methods: {
    toggleInputType() {
      this.inputType = this.inputType === 'text' ? 'password' : 'text';
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    openMsgBox() {
      this.$msgbox({
        center: true,
        title: '公众号二维码',
        message: (
          <div class="box-message">
            <div class="top">
              <span class="strong">关注公众号</span>
              回复
              <span class="strong">体验</span>
              获取体验账号
            </div>
            <div class="QRCode">
              <img src={QRCode} />
            </div>
          </div>
        ),
        confirmButtonText: '知道了',
        showClose: false,
      }).catch((err) => err);
    },
    handleLogin() {
      this.$refs.form.validate((isValid, unValidFileds) => {
        if (isValid) {
          let userInfo = {
            username: this.form.username,
            password: this.form.password,
          };
          this.isLoading = true;
          this.$store
            .dispatch('user/login', userInfo)
            .then(() => {
              this.isLoading = false;
              console.log('zzz');
              this.$router.push('/dashboard');
            })
            .catch(() => {
              this.isLoading = false;
            });
        } else {
          this.$message.error({
            message: unValidFileds[Object.keys(unValidFileds)[0]][0].message,
          });
        }
      });
    },
  },
  created() {
    let { username = '', password = '' } = getUserInfo() || {};
    this.form.username = username;
    this.form.password = password;
  },
};
</script>
<template>
  <div id="login">
    <transition
      name="el-fade-in-linear"
      appear
    >
      <div class="login-inner">
        <svg
          class="logo logo-svg"
          id="logo"
          viewBox="0 0 512 512"
        >
          <path d="M256 0C114.62 0 0 114.62 0 256s114.62 256 256 256 256-114.62 256-256S397.38 0 256 0zm0 426a170 170 0 1 1 170-170 170 170 0 0 1-170 170z" />
        </svg>
        <h1 class="site-title">登录</h1>
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
        >
          <el-form-item prop="username">
            <el-input
              placeholder="请输入用户名"
              v-model="form.username"
              clearable
            >
              <template #prefix>
                <i class="el-input__icon el-icon-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              :type="inputType"
              ref="password"
            >
              <template #prefix>
                <i class="el-input__icon el-icon-lock"></i>
              </template>
              <template #suffix>
                <el-tooltip
                  effect="dark"
                  :content="toolTipContent"
                  placement="bottom"
                >
                  <i
                    class="el-input__icon el-icon-view"
                    @click="toggleInputType"
                  ></i>
                </el-tooltip>
              </template>
            </el-input>
          </el-form-item>
          <el-button
            round
            @click="handleLogin"
            :loading="isLoading"
          >
            起飞
          </el-button>
          <el-button
            round
            @click.native="openMsgBox"
          >
            在?给个账号密码?
          </el-button>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<style lang='scss' scoped>
#login {
  background: url(~@/assets/img/login-bg.png);
  /* background-size 的百分比参照的是元素的宽高  */
  background-size: auto 100%;
  /* 把当前盒子当成画框 把背景当成画布 background-position是移动画布 那就相当于把画框往反方向拉 */
  background-position: 1700px 0px;
  /* 背景图片是不会撑起元素的高度的 只有元素的高度去决定背景图片的高度 */
  height: 858px;

  text-align: center;
  color: #fff;
  padding: 100px;
}
.login-inner {
  width: 25%;
  margin: auto;
}
::v-deep.el-form {
  .el-input__icon {
    color: #6d6d6d;
  }
  .el-icon-view:hover {
    cursor: pointer;
    color: #000;
  }
}
#logo.logo-svg {
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  vertical-align: top;
  fill: currentColor;
}
.site-title {
  margin: 0 0 20px;
  font-size: 70px;
}
.box-message {
  .top {
    font-size: 18px;
    .strong {
      color: #409eff;
      font-size: 20px;
      font-weight: bold;
    }
    margin: 20px auto;
  }
  .QRCode img {
    width: 40%;
  }
}
.el-fade-in-linear-enter-active {
  transition: all 0.5s !important;
}
.el-fade-in-linear-enter {
  transform: translate(0, -50px) !important;
}
</style>
//亲人 爱人 朋友