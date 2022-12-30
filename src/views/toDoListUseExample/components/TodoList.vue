<!-- List组件 -->
<template>
  <div class="todo-list-box">
    <ul class="todo-main">
      <TodoListItem
        v-for="(todo, index) in todos"
        :key="index"
        :todo="todo"
        @deleteTodoItem="handleDeleteTodoItem"
      />
    </ul>
    <div class="todo-empty" v-show="todos.length === 0">暂无数据~</div>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";
export default {
  name: "TodoList",
  props: {
    todos: {
      type: Array,
    },
  },
  components: { TodoListItem },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleDeleteTodoItem(data) {
      // console.log("删除");
      console.log("TodoList组件往父组件传");
      //this.$emit("deleteTodo", data);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.todo-list-box {
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }
  .todo-empty {
    height: 140px;
    line-height: 140px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
    text-align: center;
  }
}
</style>
