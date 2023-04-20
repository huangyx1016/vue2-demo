<template>
  <aside class="button-dialog">
    <el-button v-bind="{ ...btnConfig }" @click="handleButtonClick">
      {{ btnLabel }}
    </el-button>
    <el-dialog
      class="normal-dialog"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :width="width"
      v-bind="$attrs"
    >
      <transition name="el-zoom-in-top">
        <template v-if="dialogVisible">
          <slot></slot>
        </template>
      </transition>
      <span slot="footer" class="normal-dialog__footer">
        <el-button
          :loading="loading"
          type="primary"
          size="small"
          @click="onConfirm"
        >
          确 定
        </el-button>
        <el-button size="small" @click="handleClose()">取 消</el-button>
      </span>
    </el-dialog>
  </aside>
</template>

<script>
/**
 * btnLabel {String} 按钮名字
 * btnConfig {Object} 按钮配置
 * onSubmit {Function} 点击确认后，触发的onSubmit事件， 需要返回一个promise
 * queryParams {Object} onSubmit的参数
 */
export default {
  inheritAttrs: false,
  props: {
    btnLabel: {
      type: String,
      default: "",
    },
    btnConfig: {
      type: Object,
      default: () => ({
        type: "primary",
        size: "small",
      }),
    },
    onSubmit: {
      type: Function,
      default: () => Promise.resolve(true),
    },
    onClose: {
      type: Function,
      default: () => Promise.resolve(true),
    },
    queryParams: {
      type: Object,
      default: () => {},
    },
    width: {
      type: String,
      default: "550px",
    },
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
      this.onClose();
      this.$emit("close");
    },
    handleButtonClick() {
      this.dialogVisible = !this.dialogVisible;
      this.$emit("on-click");
    },
    onConfirm() {
      this.loading = true;
      this.onSubmit(this.queryParams)
        .then(() => {
          this.dialogVisible = false;
        })
        .catch((e) => e)
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.button-dialog {
  display: inline-block;
  margin: 0 10px;
}
</style>
