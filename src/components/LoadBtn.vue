<template>
  <!-- 防抖按钮组件 -->
  <el-button v-bind="$attrs" :loading="loadingStatus" @click="handleClick">
    <slot />
  </el-button>
</template>

<script>
export default {
  name: "load-button",
  props: {
    autoLoading: {
      type: Boolean,
      default: true,
    },
    autoConfirm: {
      type: Boolean,
      default: false,
    },
    confirmConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loadingStatus: false,
    };
  },
  methods: {
    handleClick() {
      const {
        message = "确定执行该操作么?",
        title = "提示",
        confirmButtonText = "确定",
        cancelButtonText = "取消",
        type = "warning",
      } = this.confirmConfig;
      if (this.autoConfirm) {
        this.$confirm(message, title, {
          confirmButtonText,
          cancelButtonText,
          type,
        })
          .then(() => {
            this.$emit("confirm", () => {
              this.loadingStatus = false;
            });
          })
          .catch(() => {
            this.loadingStatus = false;
            this.$emit("cancel");
          });
      }
      if (this.autoLoading) {
        this.loadingStatus = true;
      }
      this.$emit("click", () => {
        this.loadingStatus = false;
      });
    },
  },
};
</script>

<style></style>
