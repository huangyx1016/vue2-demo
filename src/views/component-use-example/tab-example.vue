<template>
  <!-- 选项卡组件使用示例 -->
  <div>
    <h2 :style="{ marginBottom: marginBottom + 'px' }">选项卡组件使用示例</h2>
    <h3 :style="styleObj">两种tab选项卡</h3>
    <Tabs :tabList="tabList" @change="changeTabHandle" />
    <Tab2 :tabList="tabList" @change="changeTabHandle2" />
  </div>
</template>

<script>
import Tabs from "@/components/tab.vue";
import Tab2 from "@/components/Tab2.vue";
export default {
  name: "",
  props: {},
  components: { Tabs, Tab2 },
  data() {
    return {
      marginBottom: 50,
      styleObj: {
        marginBottom: "20px",
      },
      //选项卡数据集合
      tabList: [
        { id: 1, name: "选项一" },
        { id: 2, name: "选项二" },
        { id: 3, name: "选项三" },
      ],
    };
  },
  methods: {
    //点击切换选项卡的回调函数  data是传递的选项卡的值{id:"",name:""}
    changeTabHandle(data) {
      console.log(data); //
    },
    changeTabHandle2(data) {
      console.log(data);
    },
  },
  mounted() {},
  created() {},
  watch: {},
  computed: {},
  //通过路由规则，进入该组件时被调用
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    if (to.meta.isAuth) {
      //判断是否需要进行权限效验
      if (localStorage.getItem("school") === "xxx") {
        next();
      } else {
        //消息提示
        this.$message.warning("您没有该权限");
      }
    }
  },
  //通过路由规则，离开该组件时被调用
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    next();
  },
};
</script>

<style lang="scss" scoped></style>
