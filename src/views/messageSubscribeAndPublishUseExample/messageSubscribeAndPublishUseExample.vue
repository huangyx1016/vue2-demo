<!-- 消息订阅与发布 ，另一种实现任意组件间通信的方式 -->
<!-- todoList -->
<template>
  <div class="todo-container" id="box" style="scroll-behavior: smooth">
    <!-- 全局自定义指令 -->
    <!-- <el-input v-focus></el-input> -->
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
    <el-input v-model="number" type="number"></el-input>
    <div style="height: 1000px"></div>
    <button @click="toTop">toTop</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
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
      todos: [],
      number: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    toTop() {
      //window.scrollTo(0, 0);
      document.getElementById("box").scrollTo(0, 0);
    },
    //获取todos列表数据
    getTodosData() {
      this.todos = [
        { title: "吃饭", complete: true },
        { title: "睡觉", complete: false },
        { title: "敲代码", complete: true },
      ];
      //往对象数组里面的对象添加一个新的属性
      //map()方法
      //   this.todos = this.todos.map((item) => {
      //     return {
      //       ...item,
      //       isEdit: false,
      //     };
      //   });

      //forEach方法
      //   this.todos.forEach((item) => {
      //     item.isEdit = false;
      //   });

      //   console.log("49:", this.todos);
    },
    handleAddTodo(data) {
      //往数组第一个值前面添加一项
      this.todos.unshift(data);
    },
    //第一个参数是消息名称msgName 第二个参数是数据
    handleDeleteTodo(data) {
      console.log(data, this.todos);
      console.log("删除");
      this.$confirm(`确定删除${data.title}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let todoOriginalLength = this.todos.length;
          // let index = this.todos.findIndex((item) => item.title === data.title); //findIndex找到第一个符合条件的下标
          // // console.log(index);
          // this.todos.splice(index, 1);
          // console.log(this.todos);

          this.todos = this.todos.filter((item) => item.title != data.title);
          console.log(this.todos);

          // this.todos.find((currentVal, index, arr) => {
          //   if (currentVal.title === data.title) {
          //     arr.splice(index, 1);
          //     //console.log(index);
          //     return true;
          //   }
          //   console.log(index);
          //   return false;
          // });

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
    handleUpdateTodo(data) {
      console.log("更新数据");
      console.log(data);
      //console.log("更新数据", data);
      this.todos.forEach((item) => {
        if (item.title === data.title) {
          item.title = data.title;
        }
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
    this.getTodosData();
    //使用$bus.$on触发$bus全局事件总线传递过来的deleteTodoItem事件的数据
    this.$bus.$on("deleteTodoItem", this.handleDeleteTodo);
    this.$bus.$on("updateTodoItem", this.handleUpdateTodo);
    //this.$bus.$on("checkTodo",(data)=>{this.todos.forEach((item)=>{if(item.title===data.title){item.complete = !item.complete}})});

    //使用pubsubjs 消息订阅与发布实现
    // this.pubId = pubsub.subscribe("deleteTodoItem", this.handleDeleteTodo);
    // pubsub.subscribe("checkTodo", (msgName, data) => {
    //   console.log(msgName);
    //   this.todos.forEach((item) => {
    //     if (item.title === data.title) {
    //       item.complete = !item.complete;
    //     }
    //   });
    // });
  },
  beforeCreate() {
    //解绑$bus的事件deleteTodoItem
    this.$bus.$off("deleteTodoItem");
    //解除订阅消息
    //pubsub.unsubscribe(this.pubId);
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
