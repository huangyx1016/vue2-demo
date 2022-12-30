<!--  -->
<template>
  <div class="container">
    <h1>这是学生组件</h1>
    <h2>学生姓名：{{ name }}</h2>
    <h2>学生年龄：{{ age }}</h2>
    <button @click="sendStudentName">点击把学生姓名传给School组件</button>
  </div>
</template>

<script>
//引入pubsubjs 做消息发布
import pubsub from "pubsub-js";
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
    //相当于兄弟组件传值
    sendStudentName() {
      //this.$bus.$emit("hello", this.name);

      //发布消息
      pubsub.publish("hello", 666);
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
