<!-- 顶部添加备忘录组件 -->
<template>
  <div class="todo-header">
    <!-- <input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="title"
      @keyup.enter="add"
    /> -->
    <el-input
      type="text"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="title"
      @keyup.enter.native="add"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "TodoHeader",
  components: {},
  data() {
    return {
      title: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    add() {
      // 1. 检查输入合法性
      const title = this.title.trim();
      if (!title) {
        this.$alert("请输入内容", "提示", {
          confirmButtonText: "关闭",
          callback: (action) => {
            return;
            // this.$message({
            //   type: "info",
            //   message: `action: ${action}`,
            // });
          },
        });
        return;
      }
      const todo = { title: title, complete: false };
      this.$emit("addTodo", todo);
      // 4. 清除输入
      this.title = "";
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
  &:focus {
    outline: none;
    border-color: rgba(82, 168, 236, 0.8);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 8px rgba(82, 168, 236, 0.6);
  }
}
</style>
