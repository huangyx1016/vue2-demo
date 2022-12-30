<!-- 学校组件 -->
<template>
  <div class="container">
    <h1>学校组件</h1>
    <h2>学校名称：{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="showName">点击显示名称</button>
  </div>
</template>

<script>
//引入一个mixin(混入)
import { mixin, mixin2 } from "../mixin.js";
export default {
  name: "School",
  components: {},
  data() {
    return {
      name: "xx学校",
      address: "厦门市",
      x: 999, //如果data中的数据或者methods的方法遇到同名的情况以自己的为准,mixin不会破坏
    };
  },
  //局部混合
  mixins: [mixin, mixin2],
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    console.log("mounted！！！"); //如果是生命周期的话就都会执行 先执行mixin里的生命周期，再执行自己的生命周期
  },
};
</script>
<style lang="scss" scoped></style>
