<!-- School组件 -->
<template>
  <div class="container">
    <h1>这是学校组件</h1>
    <h2>学校名称:{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
    <button @click="getSchoolName">点击显示学校名称</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: "xx学校",
      address: "厦门市",
    };
  },
  computed: {},
  watch: {},
  methods: {
    getSchoolName() {
      this.$emit("getSchoolName", this.name);
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
