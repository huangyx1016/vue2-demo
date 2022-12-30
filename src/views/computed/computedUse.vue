<!-- 计算属性的使用 -->
<template>
  <div class="container">
    <el-input type="text" placeholder="请输入姓" v-model="firstName"></el-input>
    <el-input type="text" placeholder="请输入名" v-model="lastName"></el-input>
    姓名：{{ fullName }} 姓名：{{ fullName2 }}
    <el-button type="primary" @click="changeName">改名为李四</el-button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      firstName: "张",
      lastName: "三",
    };
  },
  computed: {
    //计算属性有缓存
    fullName: {
      //通过已有的属性计算
      //初次读取时会执行一次
      //当依赖的数据发生改变时会再次调用
      get() {
        return this.firstName + " " + this.lastName;
      },
      //set在fullName被修改时调用
      set(value) {
        console.log(value);
        const arr = value.split(" ");
        this.firstName = arr[0];
        this.lastName = arr[1];
      },
    },
    //简写
    fullName2() {
      return this.firstName + this.lastName;
    },
  },
  watch: {},
  methods: {
    changeName() {
      this.fullName = "李 四";
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
