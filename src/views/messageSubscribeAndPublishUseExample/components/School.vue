<!-- School组件 -->
<template>
  <div class="container">
    <h1>这是学校组件</h1>
    <h2>学校名称:{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
//借助 pubsubjs 做消息订阅  npm i pubsub-js
import pubsub from "pubsub-js";
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
    getSubscribeMsg(msgName, data) {
      console.log("有人发布了hello消息，hello消息的回调执行了");
      console.log(msgName, data);
    },
  },
  beforeDestroy() {
    //解绑$bus上面的hello自定义事件
    //this.$bus.$off("hello");

    //取消订阅
    pubsub.unsubscribe(this.pubId);
  },
  created() {},
  mounted() {
    //School组件里通过$bus来获取传递过来的户数
    // this.$bus.$on("hello", (data) => {
    //   console.log("我是School组件，收到了数据", data);
    // });
    //接收数据的组件里面要订阅消息  回调第一个参数消息名,第二个是数据
    // this.pubId = pubsub.subscribe("hello", (msgName, data) => {
    //   console.log(this);
    //   console.log("有人发布了hello消息，hello消息的回调执行了");
    //   console.log(msgName, data);
    // });
    //写法二
    this.pubId = pubsub.subscribe("hello", this.getSubscribeMsg);
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: 20px auto;
}
</style>
