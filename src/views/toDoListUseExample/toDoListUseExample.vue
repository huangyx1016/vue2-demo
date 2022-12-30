<!-- todoList -->
<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader @addTodo="handleAddTodo" />
      <TodoList :todos="todos" />
      <TodoFooter
        :todos="todos"
        @checkAll="handleCheckAll"
        @clearAllComplete="handleClearAllComplete"
        @clearAll="handleClearAll"
      />
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList";
import TodoFooter from "./components/TodoFooter.vue";
export default {
  components: {
    TodoHeader,
    TodoList,
    TodoFooter,
  },
  data() {
    return {
      todos: [
        { title: "吃饭", complete: true },
        { title: "睡觉", complete: false },
        { title: "敲代码", complete: true },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {
    handleAddTodo(data) {
      //往数组第一个值前面添加一项
      this.todos.unshift(data);
    },
    handleDeleteTodo(data) {
      console.log(data);
      console.log("删除");
      this.$confirm(`确定删除${data.title}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let todoOriginalLength = this.todos.length;
          let index = this.todos.findIndex((item) => (item.title = data.title));
          console.log(index);
          this.todos.splice(index, 1);
          if (this.todos.length < todoOriginalLength) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          }
        })
        .catch(() => {
          return;
        });
    },
    //全选/反选
    handleCheckAll(data) {
      //遍历列表数据将全部的complete值改掉
      this.todos.forEach((item) => {
        item.complete = data;
      });
    },
    //清除全部已完成的todo
    handleClearAllComplete() {
      //两种写法相同
      this.todos = this.todos.filter((item) => !item.complete);
      // this.todos = this.todos.filter((item) => {
      //   return !item.complete;
      // });
    },
    //清除全部任务包括已完成和未完成的
    handleClearAll() {
      //删除数组里的所有数据 也可以使用 for循环，然后delete this.todos[i]
      this.todos.splice(0, this.todos.length);
    },
  },
  created() {},
  mounted() {
    //使用$bus.$on触发$bus全局事件总线传递过来的deleteTodoItem事件的数据
    this.$bus.$on("deleteTodoItem", this.handleDeleteTodo);
  },
  beforeCreate() {
    //解绑$bus的事件deleteTodoItem
    this.$bus.$off("deleteTodoItem");
  },
};
</script>
<style lang="scss" scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
  .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
}
</style>
