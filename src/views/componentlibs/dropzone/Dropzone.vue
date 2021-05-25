<template>
  <div class="components-container">
    <div class="editor-container">
      <dropzone
        id="myVueDropzone"
        url="https://httpbin.org/post"
        :default-img="defaultImg"
        @dropzone-removedFile="dropzoneR"
        @dropzone-success="dropzoneS"
      />
    </div>
  </div>
</template>

<script>
import Dropzone from '@/components/Dropzone';

export default {
  name: 'DropzoneDemo',
  components: { Dropzone },
  data() {
    return {
      defaultImg: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNRm-dLmG--QK4apPF9A3Xei1N00enkiBe7Q&usqp=CAU'
      ],
    };
  },
  methods: {
    dropzoneS(file) {
      this.$message({ message: 'Upload success', type: 'success' });
    },
    dropzoneR(file) {
      this.$message({ message: 'Delete success', type: 'success' });
    },
  },
};
</script>

