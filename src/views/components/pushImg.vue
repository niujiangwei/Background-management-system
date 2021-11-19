<template>
  <div class="pushImg">
    <el-card>
      <p class="pTitle">
        上传您的美照吧
      </p>
      <upload-com></upload-com>
      <upload-com></upload-com>
    </el-card>
  </div>
</template>

<script>
import UploadCom from '@/components/Upload'
export default {
  components: {
    UploadCom
  }
}
</script>
