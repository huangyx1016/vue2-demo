<!-- 学生组件 -->
<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <h2>学生姓名:{{ studentInfo.studentName }}</h2>
    <h2>学生年龄:{{ studentInfo.age }}</h2>
  </div>
</template>

<script>
export default {
  name: "student", //可以更改vue调试工具 vueDevTools的组件名显示
  props: {
    title: {
      type: String,
      default: "xxxx",
      required: true,
    },
    studentInfo: {
      type: Object,
      default: () => {
        return { studentName: "xxx", age: 18 };
      },
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
