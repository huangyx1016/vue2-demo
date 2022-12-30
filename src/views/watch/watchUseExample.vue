<!-- watch监听属性 -->
<template>
  <div class="container">
    今天天气很{{ info }}
    <div>
      <el-button type="primary" @click="changeWeather">改变天气</el-button>
    </div>
    <div>{{ form.curUserId }}</div>
    <div>
      <el-button type="primary" @click="changeCurUserId"
        >改变curUserId</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isHot: true,
      form: {
        curUserId: 1,
      },
    };
  },
  computed: {
    info() {
      return this.isHot ? "炎热" : "凉爽";
    },
  },
  watch: {
    isHot: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      immediate: true, //初始化时立即执行 初始化时让handler执行一次
      //deep: true, //深度监听
    },
    info: {
      handler(newVal, oldVal) {
        console.log("info");
        console.log(newVal, oldVal);
      },
      immediate: true, //初始化时立即执行 初始化时让handler执行一次
      //deep: true, //深度监听
    },
    "form.curUserId": {
      handler(val) {
        console.log("form.curUserId变化");
        console.log(val);
      },
      deep: true, //深度监听
    },
    //监听属性里可以写异步，计算属性不行
  },
  methods: {
    changeWeather() {
      this.isHot = !this.isHot;
    },
    changeCurUserId() {
      console.log("改变curUserId的值");
      this.form.curUserId = 2;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
