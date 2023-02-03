<template>
  <!-- vuex的相关使用 -->
  <div class="container">
    <!-- $store.state.模块名.变量名 -->
    <p>{{ $store.state.user.userName }}</p>
    <p>{{ $store.state.user.age }}</p>
    <el-button type="primary" @click="changeUserName"
      >点击调用mutations里方法</el-button
    >
    <el-button type="primary" @click="changeUserAge"
      >.js文件里调用vuex里的mutations里的方法</el-button
    >
    <el-button type="primary" @click="getVuexGettersData"
      >.js文件获取vuex里的getters里的值</el-button
    >
    <el-button @click="updateAgeHandle">点击调用actions里的updateAge</el-button>
    <button @click="importFn">点击</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { updateUserAge, getVuexGetters, testFn } from "./exportFnUse";
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      curIndex: 0, //这个值用于监听
    };
  },
  methods: {
    //mapMutations和mapActions辅助函数一般是要放在methods里定义
    //写法一：数组写法
    ...mapMutations("user", ["updateUserName"]),
    //写法二:对象写法
    // ...mapMutations("user", { updateName: "updateUserName" }),
    ...mapActions("user", ["updateAge"]),
    //...mapActions('模块',['方法名']),
    //点击改变用户名
    changeUserName() {
      //this.updateUserName('lisi'); //使用mutations里的方法修改state的值
      this.$store.commit("user/updateUserName", "wangwu"); //this.$store.commit('模块名/方法名',参数)
      //异步操作 this.$store.dispatch('模块名/方法名',参数);
    },
    changeUserAge() {
      this.updateUserAge(); //使用.js文件里的方法调用vuex里的mutations的方法改变年龄
    },
    getVuexGettersData() {
      this.getVuexGetters();
    },
    updateAgeHandle() {
      this.updateAge(20);
    },
  },
  mounted() {
    console.log(this.adultUsers);
    //$store.getters["模块名/方法名"]里获取
    console.log(this.$store.getters["user/getAdultUsers"]);
  },
  created() {},
  watch: {
    curIndex: {
      handler(newVal, oldVal) {
        console.log("新值：" + newVal);
        console.log("旧值：" + oldVal);
      },
      immediate: true, //立即监听  watch默认第一次不会监听
      deep: true, //深度监听 在监听的变量为对象的属性时需要开启深度监听
    },
  },
  computed: {
    //第一种写法对象写法 {key:"value"}
    //...mapState("user", { name: "userName" }),
    //mapState和mapGetters一般在computed里定义 使用拓展运算符
    //第二种写法数组写法
    ...mapState("user", ["userName"]),
    //对象形式的获取mapGetters里的值 adultUsers映射 getAdultUsers
    ...mapGetters("user", { adultUsers: "getAdultUsers" }), //写成 ...mapGetters("模块名",变量1:"getAdultUsers") 这里使用的是对象映射的方式
    //将vuex中getters 里的getAdultUsers 映射为 adultUser
  },
};
</script>

<style lang="scss" scoped></style>
