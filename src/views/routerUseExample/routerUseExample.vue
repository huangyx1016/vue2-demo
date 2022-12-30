<!-- vue 路由 -->
<template>
  <div class="container">
    路由 vue
    <el-button type="primary" @click="forward">点击前进</el-button>
    <el-button type="primary" @click="back">点击后退</el-button>
    <el-button type="primary" @click="go(-1)">点击前进或后退n步</el-button>
    <router-link to="/messageSubscribeAndPublishUseExample">跳转</router-link>
    <!-- <Child /> -->
    <!-- 缓存组件   这里的include后面的是组件里的name(即组件名)不是路由里的name-->
    <!-- 作用是让不展示的路由保持挂载，不被销毁  keep-alive得在router-view里面包 -->
    <!-- 这是缓存一个路由组件 -->
    <keep-alive include="Child">
      <router-view></router-view>
    </keep-alive>
    <!-- 也可以写成数组 缓存多个路由组件 -->
    <!-- <keep-alive include="["Child,Detail"]">
      <router-view></router-view>
    </keep-alive> -->
    <h2 :style="{ opacity: opacity }">信息信息信息</h2>
    <div class="tab-container">
      <div class="tab-box">
        <div
          class="tab-box-items"
          :class="{ 'tab-active': tabIndex === index }"
          v-for="(item, index) in tabList"
          :key="item.id"
          @click="setTabIndex(item, index)"
        >
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Child from "./components/Child.vue";
export default {
  components: {},
  data() {
    return {
      opacity: 1,
      tabList: [
        { id: 1, name: "选项一" },
        { id: 2, name: "选项二" },
      ],
      tabIndex: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    forward() {
      this.$router.forward();
    },
    back() {
      this.$router.back();
    },
    go(n) {
      this.$router.go(n);
    },
    setTabIndex(item, index) {
      console.log(index);
      console.log(this.tabIndex);
      if (index !== this.tabIndex) {
        this.tabIndex = index;
      }
    },
  },
  created() {},
  mounted() {},
  //路由的两个生命周期
  activated() {
    console.log("激活");
    this.timer = setInterval(() => {
      this.opacity -= 0.01;
      if (this.opacity <= 0) this.opacity = 1;
    }, 30);
  },
  deactivated() {
    console.log("失活");
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
.container {
  .tab-container {
    width: 300px;
    .tab-box {
      display: flex;

      border: 1px solid darkcyan;
      .tab-box-items {
        height: 50px;
        line-height: 50px;
        width: 100px;
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
      }
      .tab-active {
        background-color: aquamarine;
        color: #fff;
      }
    }
  }
}
</style>
