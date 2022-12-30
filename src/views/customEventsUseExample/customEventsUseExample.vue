<!-- vue 自定义事件 -->
<template>
  <div class="container">
    <School @getSchoolName="handleGetSchoolName" />
    <!-- 第一种写法：通过子组件触发自定义函数的方式 -->
    <!-- .native修饰符可以让子组件绑定原生DOM事件 -->
    <Student
      @getStudentName="handleGetStudentName"
      @demo="handleDemo"
      @click.native="show"
    />
    <!-- 自定义事件只能触发一次 -->
    <!-- <Student @getStudentName.once="handleGetStudentName" /> -->
    <!-- 第二种写法：使用ref和mounted声明周期  -->
    <!-- <Student ref="studentDom" /> -->
  </div>
</template>

<script>
import School from "./components/School.vue";
import Student from "./components/Student.vue";
export default {
  components: { School, Student },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleGetSchoolName(data) {
      this.$message.warning(data);
    },
    //传递多个参数    ...params 拓展运算符
    handleGetStudentName(data, ...params) {
      this.$message.warning(data);
      console.log(params); //[18,"男",180]
    },
    handleDemo() {
      console.log("demo事件被触发了");
    },
    show() {
      this.$message.warning("点击Student组件");
    },
  },
  created() {},
  mounted() {
    //这种方式灵活性更强,可以实现3s后再绑定自定义事件
    setTimeout(() => {
      //绑定自定义事件
      //this.$refs.studentDom.$on("getStudentName", this.handleGetStudentName);
      //this.$refs.studentDom.$once("getStudentName", this.handleGetStudentName); //自定义事件只能使用一次
    }, 3000);
  },
};
</script>
<style lang="scss" scoped></style>
