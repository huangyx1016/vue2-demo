<!-- 弹窗组件 -->
<template>
  <el-dialog
    class="avue-dialog"
    :visible.sync="show"
    v-bind="$attrs"
    :before-close="changeShow"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'PublicDialogCom',
  components: {},
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    changeShow() {
      this.$emit('change', !this.show)
    }
  }
}

</script>
<style lang='scss' scoped>
  .avue-dialog {
    top: 10%;
    // ::v-deep.el-dialog {
    //   margin-top: 0!important;
    // }
  }

</style>
