<!-- List组件 -->
<template>
  <div class="todo-list-box">
    <ul class="todo-main">
      <transition-group name="todo" appear>
        <TodoListItem
          v-for="(todo, index) in todos"
          :key="index"
          :todo="todo"
          @deleteTodoItem="handleDeleteTodoItem"
        />
      </transition-group>
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
  /*进入的起点,离开的终点 */
  .todo-enter,
  .todo-leave-to {
    transform: translateX(100%);
  }
  /*进入的终点,离开的起点 */
  .todo-enter-to,
  .todo-leave {
    transform: translateX(0px);
  }
  /*进入/离开过程中  这个类可以被用来定义进入/离开过渡的过程时间，延迟和曲线函数。 */
  .todo-enter-active,
  .todo-leave-active {
    transition: 0.5s linear;
  }
}
</style>
