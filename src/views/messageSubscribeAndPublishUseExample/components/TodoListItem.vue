<!-- ListItem组件 -->
<template>
  <!-- 思考为什么选择外层div后可以改变el-checkbox的选择状态而此时点击el-checkbox勾选状态不生效 -->
  <div class="list-item-box">
    <li>
      <label>
        <!-- <input type="checkbox" v-model="todo.complete" /> -->
        <el-checkbox
          v-model="todoItem.complete"
          @change="selectChecked(todoItem)"
          ><span v-show="!todoItem.isEdit">{{ todoItem.title }}</span>
          <!-- <el-input
            type="text"
            v-model="todoItem.title"
            v-show="todoItem.isEdit"
            @blur="handleEditTitleInputChange(todoItem)"
            @keyup.enter.native="handleEditTitleInputChange(todoItem)"
            ref="inputTitle"
          ></el-input> -->
          <input
            type="text"
            :value="todo.title"
            v-show="todo.isEdit"
            @change="handleEditTitleInputChange2(todo, $event)"
            ref="inputTitle"
          />
        </el-checkbox>
        <!-- <el-checkbox :checked="todo.complete" @change="selectChecked(todo)">{{
          todo.title
        }}</el-checkbox> -->

        <!-- <input type="checkbox" :checked="checkTodo" @change="checkTodo(todo)" /> -->
        <!-- <span class="todo-name">{{ todo.title }}</span> -->
      </label>
      <div class="operation-btn-box">
        <button
          class="btn btn-edit"
          v-show="!todoItem.isEdit"
          @click.stop="handleEdit(todoItem)"
        >
          编辑
        </button>
        <button class="btn btn-danger" @click.stop="deleteTodoItem(todoItem)">
          删除
        </button>
      </div>
    </li>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
export default {
  name: "TodoListItem",
  props: {
    todo: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {
      todoItem: this.todo,
    };
  },
  computed: {},
  watch: {},
  methods: {
    deleteTodoItem(data) {
      console.log("使用pubsubjs发布订阅实现组件通信");
      // this.$emit("deleteTodoItem", data);
      this.$bus.$emit("deleteTodoItem", data);

      //发布消息
      //pubsub.publish("deleteTodoItem", data);
    },
    checkTodo(data) {
      this.$bus.$emit("checkTodo", data);
      //pubsub.publish("checkTodo", data);
    },
    //点击选中checkbox
    selectChecked(data) {
      data.complete = !data.complete;
    },
    handleEdit(data) {
      //data.isEdit = true;
      //判断对象是否有isEdit属性
      if (data.hasOwnProperty("isEdit")) {
        console.log("todo上面有isEdit属性");
        data.isEdit = true; //判断如果有isEdit属性就不用再执行this.$set(data, "isEdit", true);
      } else {
        this.$set(data, "isEdit", true);
      }
      //$nextTick指定的回调会在下一次DOM更新完后再执行
      this.$nextTick(() => {
        this.$refs.inputTitle.focus();
      });
    },
    //element-ui el-input change事件--仅在输入框失去焦点或用户按下回车时触发
    handleEditTitleInputChange(data) {
      console.log("失去焦点或回车显示标题");
      data.isEdit = false;
      console.log(data.title);
      if (data.title.trim() === "") {
        this.$alert("输入不能为空", "提示", {
          confirmButtonText: "关闭",
          callback: (action) => {
            return;
          },
        });
        return;
      }
      this.$bus.$emit("updateTodoItem", data);
    },
    handleEditTitleInputChange2(data, e) {
      console.log("失去焦点或回车显示标题");
      data.isEdit = false;
      console.log(data.title);
      if (e.target.value.trim() === "") {
        this.$alert("输入不能为空", "提示", {
          confirmButtonText: "关闭",
          callback: (action) => {
            return;
          },
        });
        return;
      }
      this.$bus.$emit("updateTodoItem", data);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
/*item*/
.list-item-box {
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 5px;
    border-bottom: 1px solid #ddd;
    display: flex;
    &:hover {
      background-color: #efefef;
    }
    &:hover .operation-btn-box {
      display: block;
    }
    .operation-btn-box {
      margin-left: auto;
      display: none;
      .btn {
        margin-top: 3px;
        height: 26px;
        margin-right: 10px;
        &:before {
          content: initial;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    label {
      float: left;
      cursor: pointer;
      .todo-name {
        color: #aaa;
      }
      li {
        input {
          vertical-align: middle;
          margin-right: 6px;
          position: relative;
          top: -1px;
        }
      }
    }
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
