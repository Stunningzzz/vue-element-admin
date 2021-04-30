<template>
  <div>
    <aside>This is based on
      <a
        class="link-type"
        href="//github.com/dai-siki/vue-image-crop-upload"
      > vue-image-crop-upload</a>.
      Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.
    </aside>

    <div class="rotate-avatar-wrapper">
      <div class="rotate-avatar-framework"></div>
      <RotateAvatar :avatarUrl="imgUrl" />
    </div>

    <el-button
      type="primary"
      icon="el-icon-upload"
      class="upload-button"
      @click="imagecropperShow = true"
    >
      Change Avatar
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      url="https://httpbin.org/post"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import RotateAvatar from '@/components/RotateAvatar';
import ImageCropper from './imagecropper/ImageCropper';

export default {
  name: 'Upload',
  components: { RotateAvatar,ImageCropper },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      imgUrl:
        'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
    };
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      this.imgUrl = resData.files.avatar;
    },
    close() {
      this.imagecropperShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.rotate-avatar-wrapper {
  position: relative;
  display: inline-block;
  vertical-align: bottom;
  .rotate-avatar-framework {
    width: 150px;
    height: 150px;
    border: 5px solid #f2f2f2;
    border-radius: 50%;
  }
  .rotate-avatar {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border-radius: 50%;
  }
}
.upload-button{
  margin-left: 30px;
}
</style>

