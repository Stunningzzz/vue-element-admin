<template>
  <div class="upload-container">
    <el-button
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click=" dialogVisible=true"
    >
      上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        list-type="picture-card"
      >
        <el-button
          size="small"
          type="primary"
        >
          点击上传
        </el-button>
      </el-upload>
      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleSubmit"
        >
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditorSlideUpload',
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      uploadFileCount: 0,
    };
  },
  methods: {
    handleSubmit() {
      if (this.uploadFileCount > this.fileList.length) {
        this.$message.warning(
          'Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!'
        );
        return;
      }
      let { fileList } = this;
      this.fileList = [];
      this.dialogVisible = false;
      this.uploadFileCount = 0;
      this.$emit('successCBK', fileList);
    },
    handleSuccess(response, file, fileList) {
      if (fileList.length === this.uploadFileCount) {
        this.fileList = fileList;
      }
    },
    // 在选择文件之后 上传之前执行
    beforeUpload({ type, size }) {
      let regExp = /^image\//,
        res = true;
      // 是图片
      if (regExp.test(type)) {
        if (size > 5 * 10 ** 5) {
          this.$message.error('文件大小超过 500kb! 请重新选择');
          res = false;
        }
      } else {
        this.$message.error('不能上传非图片文件!');
        res = false;
      }
      res && this.uploadFileCount++;
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
