<template>
  <el-upload
    class="avatar-uploader"
    action="/"
    accept="image/png, image/jpeg, image/jpg"
    :http-request="httpRequest"
    :show-file-list="false"
  >
    <img
      v-if="imgurl"
      :src="imgurl"
      class="avatar"
      style="border: 1px dashed #d9d9d9"
    />
    <i
      v-else
      class="el-icon-plus avatar-uploader-icon"
      style="border: 1px dashed #d9d9d9"
    ></i>
  </el-upload>
</template>
<script>
//文件上传接口api
import { uploadPic } from "@/api/lottery.js";
export default {
  props: {
    imgurl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    httpRequest(options) {
      // 获取文件对象

      let file = options.file;
      // 判断是否符合图片格式
      var typeArr = ["image/jpeg", "image/png", "image/JPG"];
      if (typeArr.indexOf(file.type) == -1) {
        this.$message.error("上传图片只能是 JPG/PNG/JPEG 格式!");
        return;
      }
      // 判断图片大小
      if (file.size / 1024 / 1024 > 2) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return;
      }
      // FormData 对象
      var formData = new FormData();
      // 文件对象
      formData.append("file", file);
      uploadPic(formData).then((res) => {
        if (res.code == "00000") {
          this.$emit("update:imgurl", res.data);
        } else {
          this.$message({
            type: "error",
            message: res.desc,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
