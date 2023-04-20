<template>
  <!-- 文件上传excel-->
  <el-upload
    ref="upload"
    :accept="accept"
    :data="data"
    :headers="headers"
    :action="action"
    :auto-upload="autoUpload"
    :multiple="false"
    :file-list="fileList"
    :before-upload="beforeUpload"
    :on-remove="handleRemoveFile"
    :on-success="handleSuccess"
    :on-change="handleFileChange"
    class="upload-excel"
  >
    <!-- :http-request="handleHttpRequest" -->
    <el-button size="small" type="primary">选择文件</el-button>
    <div slot="tip" class="el-upload__tip">
      一次只能上传一个文件，且大小不超过
      <span>{{ limit }}</span>
      M
      <!-- <span>Excel</span> -->
    </div>
  </el-upload>
</template>

<script>
import { Message } from "element-ui";
import { getToken } from "@/utils/auth";
export default {
  props: {
    // 自动上传
    autoUpload: {
      type: Boolean,
      default: true,
    },
    // 限制大小
    limit: {
      type: Number,
      default: 20,
    },
    // 接收的格式
    accept: {
      type: String,
      default: ".xls,.xlsx",
    },
    // 上传文件服务器地址
    action: {
      type: String,
      // default: `${baseURL}/${admin}/admin/sysFile/uploadFile`,
      default:
        process.env.NODE_ENV !== "production"
          ? "/proxyApi/admin/admin/sysFile/uploadFile"
          : window.location.origin +
            "/api/admin/admin/admin/sysFile/uploadFile",
    },
    // 上传需要额外的参数
    data: {
      type: Object,
      default: () => {
        return {
          fileType: "GIFT_CARD",
        };
      },
    },
  },
  data() {
    return {
      fileList: [],
    };
  },
  computed: {
    headers() {
      const token = getToken();
      return {
        Authorization: `Bearer ${token}`,
      };
    },
  },
  methods: {
    /**
     * 上传文件之前狗子
     * 判断上传文件格式、大小等，若返回false则停止上传
     */
    beforeUpload(file) {
      // 判断文件类型
      const excelType = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      // 判断文件类型是否为excel
      const isEXCEL = excelType.includes(file.type);

      if (!isEXCEL) {
        Message.error("请上传excel格式的文件！");
      }

      // 文件大小限制为10M
      const isLtM = file.size / 1024 / 1024 < this.limit;
      if (!isLtM) {
        Message.error(`文件大小不得超过${this.limit}M！`);
      }
      // 处理是否添加文件
      if (!(isEXCEL && isLtM)) {
        this.fileList = [];
      }
      return isEXCEL && isLtM;
    },
    // 文件发生改变
    handleFileChange(file, fileList) {
      if (!this.beforeUpload(file.raw)) {
        return false;
      }
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
      if (!this.autoUpload) {
        this.$emit("on-success", file);
        this.$emit("input", file);
      }
    },
    // 移除选择的文件
    handleRemoveFile(file, fileList) {
      if (fileList.length < 1) {
        this.uploadDisabled = true;
      }
    },
    handleSuccess(res) {
      console.log(res, "上传成功");
      this.$emit("on-success", res.data);
      this.$emit("input", res.data);
    },
  },
};
</script>
<style lang="scss">
.upload-excel {
  .el-upload__tip {
    margin-top: 0;
    display: inline-block;
    margin-left: 10px;
    span {
      color: #ff5123;
    }
  }
}
</style>
