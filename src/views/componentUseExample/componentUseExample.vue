<!-- 组件的是要 -->
<template>
  <div class="container">
    <h1 ref="titleDom">{{ msg }}</h1>
    <el-button @click="getDom">点击获取dom元素</el-button>
    <school :title="schoolComTitle" :schoolInfo="schoolInfo" ref="schoolDom" />
    <hr />
    <!-- <student :title="studentComTitle" :studentInfo="studentInfo" /> -->
    <!-- 全局组件 -->
    <hello-com />
    <globalCom />
  </div>
</template>

<script>
//推荐的组件命名 一个单词推荐纯小写 或者首字母大写   如果是多个单词 推荐kebab-case命名(my-school)或者CamelCase命名(MySchool)
import school from "./components/school.vue";
import HelloCom from "./components/helloCom.vue";
export default {
  components: { school, HelloCom },
  data() {
    return {
      msg: "提示信息",
      schoolComTitle: "学校组件",
      studentComTitle: "学生组件",
      schoolInfo: {
        schoolName: "xx学校",
        address: "厦门市",
      },
      studentInfo: {
        studentName: "张三",
        age: 18,
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    getDom() {
      //   console.log(this.$refs.titleDom); //获取真实DOM元素
      console.log(this.$refs.schoolDom); //获取school组件实例对象 vueComponent
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
