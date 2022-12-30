<!-- Search 组件 -->
<template>
  <div class="search-box">
    <div class="search-content-box">
      <el-input
        type="text"
        :placeholder="placeholder"
        :prefix-icon="loading ? 'el-icon-loading' : 'el-icon-search'"
        :clearable="clearable"
        :disabled="disabled ? loading : disabled"
        v-model="searchValue"
        @input="inputHandle"
        ref="searchDom"
        @keyup.enter.native="searchHandle"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchHandle"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    //搜索加载中
    loading: {
      type: Boolean,
      default: false,
    },
    // 加载中是否禁用整个搜索框 || 只禁用搜索图标
    disabled: {
      type: Boolean,
      default: false,
    },
    //搜索框提示内容
    placeholder: {
      type: String,
      default: "请输入用户名",
    },
    //是否可清空
    clearable: {
      type: Boolean,
      default: true,
    },
    //是否防抖,防抖时间,传0表示不防抖
    delay: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      searchValue: "", //搜索内容
    };
  },
  computed: {},
  watch: {},
  methods: {
    searchHandle() {
      //   console.log("传递");
      this.$emit("search", this.searchValue);
    },
    inputHandle() {
      this.$emit("change", this.searchValue);
      if (this.delay) {
        this.debounce(function () {
          console.log("防抖执行");
        }, this.delay);
      }
    },
    /**
     * 防抖函数
     */
    debounce(fn, delay) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(fn, delay);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.search-box {
  width: 100%;
  height: 100px;
  background-color: gray;
  padding: 20px;
  box-sizing: border-box;
  .search-content-box {
    width: 350px;
    display: flex;
    justify-content: space-between;
    ::v-deep .el-input {
      width: 250px;
    }
  }
}
</style>
