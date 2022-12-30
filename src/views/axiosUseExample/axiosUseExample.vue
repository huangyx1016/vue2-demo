<!-- vue axios的使用 -->
<template>
  <div class="container"></div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    getStudentData() {
      //axios发送get请求
      //跨域问题的三种解决方式1、后端配置cors请求头2、JSONP3、配置代理服务器(常用)
      axios
        .get("http://localhost:8080/api/students")
        .then((response) => {
          console.log(response);
          console.log("请求学生数据成功", response.data);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    getCarsData() {
      axios
        .get("http://localhost:8080/demo/cars")
        .then((response) => {
          console.log(response);
          console.log("请求汽车数据成功", response.data);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
  },
  created() {},
  mounted() {
    this.getStudentData();
    this.getCarsData();
  },
};
</script>
<style lang="scss" scoped></style>
