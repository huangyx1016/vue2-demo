<!-- School组件 -->
<template>
  <div class="container">
    <h1>这是学校组件</h1>
    <h2>学校名称:{{ name }}</h2>
    <h2>学校地址：{{ address }}</h2>
  </div>
</template>

<script>
import { busEventName } from "../config/busEvent.js";
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
    getEventBusData(data) {
      console.log("我是School组件，收到了数据", data);
    },
  },
  beforeDestroy() {
    //解绑$bus上面的hello自定义事件
    this.$bus.$off(busEventName.HELLO);
  },
  created() {},
  mounted() {
    //School组件里通过$bus来获取传递过来的事件
    // this.$bus.$on(busEventName.HELLO, (data) => {
    //   console.log(this); // VueComponent对象
    //   console.log("我是School组件，收到了数据", data);
    // });
    //写法二
    this.$bus.$on(busEventName.HELLO, this.getEventBusData);
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: 20px auto;
}
</style>
