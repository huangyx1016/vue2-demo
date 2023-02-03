<!-- 底部 -->
<template>
  <div class="todo-footer" v-show="total">
    <label>
      <input type="checkbox" v-model="isCheckedAll" />
    </label>
    <span>
      <span>已完成{{ completeSize }}</span> / 全部{{ total }}
    </span>
    <div class="btn-box">
      <button class="btn btn-danger" @click="handleClearAllComplete">
        清除已完成任务
      </button>
      <button class="btn btn-danger" @click="handleClearAll">
        清除全部任务
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoFooter",
  props: {
    todos: {
      type: Array,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    completeSize() {
      // let count = 0;
      // this.todos.forEach((item) => {
      //   if (item.complete) count++;
      // });
      // return count;
      //js reduce()函数 主要用于条件计数
      const x = this.todos.reduce((pre, current) => {
        // console.log("pre" + pre);
        // console.log("current", current);
        return pre + (current.complete ? 1 : 0);
      }, 0);
      return x;
    },
    total() {
      return this.todos.length;
    },
    isCheckedAll: {
      get() {
        return this.completeSize === this.total && this.total > 0;
      },
      //设置勾选值
      set(val) {
        this.$emit("checkAll", val);
      },
    },
  },
  watch: {},
  methods: {
    handleClearAllComplete() {
      this.$emit("clearAllComplete");
    },
    handleClearAll() {
      this.$emit("clearAll");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
/**.todo-footer */
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding: 10px 5px;
  margin-top: 5px;
  display: flex;
  .btn-box {
    margin-left: auto;
    button {
      border: none;
      margin-left: auto;
      margin-right: 10px;
      background-color: orangered;
      border-radius: 5px;
      color: #fff;
      height: 100%;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
    input {
      position: relative;
      top: -1px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
</style>
