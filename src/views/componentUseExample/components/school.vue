<!-- 学校组件 -->
<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <h2>学校名称:{{ schoolInfo.schoolName }}</h2>
    <h2>学校地址:{{ myAddress }}</h2>
    <button @click="showName">点击提示学校名</button>
    <button @click="updateAddress">尝试修改props接收的address</button>
    <StudentCom :title="studentComTile" />
  </div>
</template>

<script>
import StudentCom from "./student.vue";
export default {
  //props:["title","schoolInfo"], 数组写法  简单接收
  //props:{title:String}
  props: {
    //props接收到的值不要改   要改的话就在data里定义一个新的变量名,重新赋值然后再去改data里的数据
    title: {
      type: String, //类型
      //default: "xxxx", //默认值
      required: true, //必须传
    },
    schoolInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: { StudentCom },
  data() {
    return {
      myAddress: this.schoolInfo.address,
      studentComTile: "学生信息组件",
    };
  },
  computed: {},
  watch: {},
  methods: {
    showName() {
      console.log(this); //组件的this是VueComponent的实例对象(组件实例对象)
      this.$message.warning(this.schoolInfo.schoolName);
    },
    updateAddress() {
      this.myAddress = "福州市";
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
