<!-- Student组件 -->
<template>
  <div class="container">
    <h1>这是学生组件</h1>
    <h2>学生姓名:{{ name }}</h2>
    <h2>年龄:{{ age }}</h2>
    <button @click="showName">点击显示名称</button>
  </div>
</template>

<script>
//引入一个mixin(混入)
//mixin相当于把相同的配置复用
import { mixin, mixin2 } from "../mixin.js";
export default {
  name: "Student",
  components: {},
  data() {
    return {
      name: "张三",
      age: 18,
    };
  },
  mixins: [mixin, mixin2],
  computed: {},
  watch: {},
  methods: {
    showName() {
      this.$message.warning(this.name);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
