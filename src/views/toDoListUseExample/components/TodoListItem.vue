<!-- ListItem组件 -->
<template>
  <div class="list-item-box" @click="selectChecked(todo)">
    <li>
      <label>
        <!-- <input type="checkbox" v-model="todo.complete" /> -->
        <el-checkbox v-model="todo.complete">{{ todo.title }}</el-checkbox>
      </label>
      <button class="btn btn-danger" @click="deleteTodoItem(todo)">删除</button>
    </li>
  </div>
</template>

<script>
export default {
  name: "TodoListItem",
  props: {
    todo: {
      type: Object,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    deleteTodoItem(data) {
      console.log("使用全局事件总线$bus传递事件到toDoListUseExample");
      // this.$emit("deleteTodoItem", data);
      this.$bus.$emit("deleteTodoItem", data);
    },
    //点击选中checkbox
    selectChecked(data) {
      data.complete = !data.complete;
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
    &:hover {
      background-color: #efefef;
    }
    &:hover .btn {
      display: block;
    }
    .btn {
      float: right;
      display: none;
      margin-top: 3px;
      height: 26px;
    }
    .btn-danger {
      background-color: orangered;
      color: #fff;
      border: none;
      text-align: center;
      cursor: pointer;
    }
    &:before {
      content: initial;
    }
    &:last-child {
      border-bottom: none;
    }
    label {
      float: left;
      cursor: pointer;
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
}
</style>
