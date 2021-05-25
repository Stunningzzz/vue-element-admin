<template>
  <div
    :id="id"
    :ref="id"
    :action="url"
    class="dropzone"
  >
    <input
      type="file"
      name="file"
    >
    <div
      v-show="false"
      ref="previewTemplate"
    >
      <div class="dz-preview dz-file-preview">
        <div
          class="dz-image"
          :style="{width:thumbnailWidth + 'px',height:thumbnailHeight + 'px'}"
        >
          <img
            :style="{width:thumbnailWidth + 'px',height:thumbnailHeight + 'px'}"
            data-dz-thumbnail
          />
        </div>
        <div class="dz-details">
          <div class="dz-size">
            <span data-dz-size></span>
          </div>
          <div class="dz-filename">
            <span data-dz-name></span>
          </div>
        </div>
        <div class="dz-progress">
          <span
            class="dz-upload"
            data-dz-uploadprogress
          ></span>
        </div>
        <div class="dz-error-message">
          <span data-dz-errormessage></span>
        </div>
        <div class="dz-success-mark">
          <svg
            width="54px"
            height="54px"
            viewBox="0 0 54 54"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
          >
            <title>Check</title>
            <defs></defs>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              sketch:type="MSPage"
            >
              <path
                d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"
                id="Oval-2"
                stroke-opacity="0.198794158"
                stroke="#747474"
                fill-opacity="0.816519475"
                fill="#FFFFFF"
                sketch:type="MSShapeGroup"
              ></path>
            </g>
          </svg>
        </div>
        <div class="dz-error-mark">
          <svg
            width="54px"
            height="54px"
            viewBox="0 0 54 54"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
          >
            <title>Error</title>
            <defs></defs>
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
              sketch:type="MSPage"
            >
              <g
                id="Check-+-Oval-2"
                sketch:type="MSLayerGroup"
                stroke="#747474"
                stroke-opacity="0.198794158"
                fill="#FFFFFF"
                fill-opacity="0.816519475"
              >
                <path
                  d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"
                  id="Oval-2"
                  sketch:type="MSShapeGroup"
                ></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div
      v-show="false"
      ref="defaultMessage"
    >
      <i
        style="margin-top: 3em;display: inline-block"
        class="material-icons"
      >
        {{defaultMsg}}
      </i>
      <br>
      Drop files here to upload
    </div>
  </div>

</template>

<script>
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css';

Dropzone.autoDiscover = false;

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    clickable: {
      type: Boolean,
      default: true,
    },
    defaultMsg: {
      type: String,
      default: '上传图片',
    },
    acceptedFiles: {
      type: String,
      default: '',
    },
    thumbnailHeight: {
      type: Number,
      default: 200,
    },
    thumbnailWidth: {
      type: Number,
      default: 200,
    },
    showRemoveLink: {
      type: Boolean,
      default: true,
    },
    maxFilesize: {
      type: Number,
      default: 2,
    },
    maxFiles: {
      type: Number,
      default: 3,
    },
    autoProcessQueue: {
      type: Boolean,
      default: true,
    },
    useCustomDropzoneOptions: {
      type: Boolean,
      default: false,
    },
    defaultImg: {
      default: '',
      type: [String, Array],
    },
    couldPaste: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      dropzone: null,
      hasInit: false,
    };
  },
  watch: {
    defaultImg(val) {
      this.hasInit || this.initImages(val);
    },
  },
  mounted() {
    const element = document.getElementById(this.id);
    const vm = this;
    let {
        clickable,
        thumbnailWidth,
        thumbnailHeight,
        maxFiles,
        maxFilesize,
        showRemoveLink,
        autoProcessQueue,
      } = this,
      { previewTemplate, defaultMessage } = this.$refs;
    this.dropzone = new Dropzone(element, {
      // 是否可以点击打开文件选择框
      clickable: clickable,

      // 预览图的尺寸
      thumbnailWidth: thumbnailWidth,
      thumbnailHeight: thumbnailHeight,

      // 限制文件个数和文件大小
      maxFiles: maxFiles,
      maxFilesize: maxFilesize,

      // 是否添加删除选项
      addRemoveLinks: showRemoveLink,

      // 删除选项所显示的文本
      dictRemoveFile: 'Remove',

      // 限制可上传的文件类型 如果是并集的话用 ',' 隔开 如 '.png,.jpg' 表示接收 .png或.jpg
      // 'img/*' 表示接收所有图片类型
      // acceptedFiles: acceptedFiles,
      acceptedFiles: '.png',

      // 是否在选择完文件后自动上传
      autoProcessQueue: autoProcessQueue,

      // 初始化显示在可点击区域内的内容 (可写成html字符串的形式)
      dictDefaultMessage: defaultMessage.innerHTML,

      // 超出上传文件个数的提示信息
      dictMaxFilesExceeded: `最多只能同时上传${maxFiles}个文件`,

      // 自定义预览组件的模板 虽然默认情况下也会有但是效果并不是很好
      /** 注意data-dz-xxx 表示该元素的内容为对应的信息 由dropzone解析并填入 */
      previewTemplate: previewTemplate.innerHTML,

      /** 该函数的this就是该dropzone实例对象 */
      init() {
        // 如果服务端有图片需要展示的话 初始化添加所有图片的预览图
        vm.initImages(vm.defaultImg, this);
      },

      // 校验文件的钩子 This function will not be called if the file is too big or doesn't match the mime types.
      // 如果调用done且不传参数的话 文件通过 如果done(字符串)的话 就将该字符串作为错误信息进行提示并将文件设置为不通过
      accept: (file, done) => {
        /* 七牛*/
        // const token = this.$store.getters.token;
        // getToken(token).then(response => {
        //   file.token = response.data.qiniu_token;
        //   file.key = response.data.qiniu_key;
        //   file.url = response.data.qiniu_url;
        //   done();
        // })

        done();
      },

      // 上传文件前的钩子
      sending: (file, xhr, formData) => {
        // formData.append('token', file.token);
        // formData.append('key', file.key);
        vm.initOnce = false;
      },
    });

    if (this.couldPaste) {
      document.addEventListener('paste', this.pasteImg);
    }

    this.dropzone.on('success', (file) => {
      vm.$emit('dropzone-success', file, vm.dropzone.element);
    });
    this.dropzone.on('addedfile', (file) => {
      vm.$emit('dropzone-fileAdded', file);
    });
    this.dropzone.on('removedfile', (file) => {
      vm.$emit('dropzone-removedFile', file);
    });
    this.dropzone.on('error', (file, error, xhr) => {
      vm.$emit('dropzone-error', file, error, xhr);
    });
    this.dropzone.on('successmultiple', (file, error, xhr) => {
      vm.$emit('dropzone-successmultiple', file, error, xhr);
    });
  },
  destroyed() {
    document.removeEventListener('paste', this.pasteImg);
    this.dropzone.destroy();
  },
  methods: {
    pasteImg(event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData)
        .items;
      items[0].kind === 'file' && this.dropzone.addFile(items[0].getAsFile());
    },
    initImages(val, dropzoneObj) {
      let dropzone = dropzoneObj || this.dropzone;
      if (!val) return;
      if (typeof val === 'string') {
        val = [val];
      }
      if (val.length === 0) return;

      this.hasInit = true;
      val.forEach((v, i) => {
        const mockFile = { name: 'name' + i, size: 12345, url: v };

        // addedfile 是添加文件后的回调 参数为 file
        // thumbnail 是每个预览元素被创建出来后的回调 参数为 file,dataUrl

        // 直接调用回调添加相应的预览图
        dropzone.options.addedfile.call(dropzone, mockFile);
        dropzone.options.thumbnail.call(dropzone, mockFile, v);

        // 模拟上传成功后的样式改变
        mockFile.previewElement.classList.add('dz-success');
        mockFile.previewElement.classList.add('dz-complete');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep.dropzone {
  border: 2px solid #e5e5e5;
  font-family: 'Roboto', sans-serif;
  color: #777;
  transition: background-color 0.2s linear;
  padding: 5px;
  &:hover {
    .dropzone:hover {
      background-color: #f6f6f6;
    }
  }
  input[name='file'] {
    display: none;
  }
  .dz-preview .dz-error-message {
    top: 140px;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}
</style>
