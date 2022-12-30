<!--  -->
<template>
  <div class="container">
    <h1>这是学生组件</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <button @click="getStudentName">点击获取学生姓名</button>
    <button @click="unbind">解绑getStudentName事件</button>
    <button @click="death">点击销毁组件实例</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "张三",
      age: 18,
      sex: "男",
      height: 180,
    };
  },
  computed: {},
  watch: {},
  methods: {
    getStudentName() {
      //这边传递的参数可以对象传或者正常传
      this.$emit("getStudentName", this.name, this.age, this.sex, this.height);
      this.$emit("demo");
    },
    unbind() {
      //解绑一个自定义事件
      this.$off("getStudentName");
      //解绑多个自定义事件
      //this.$off(["getStudentName", "demo"]);
      //解绑所有的自定义事件
      //this.$off();
    },
    death() {
      this.$destroy(); //销毁组件实例,销毁后所有Student组件实例的自定义事件都被销毁了，不能用了，原生事件是可以用的，但是相应式不能用了
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.container {
  margin: 20px auto;
}
</style>
