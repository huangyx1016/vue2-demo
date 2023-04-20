<!-- vue 过渡效果 -->
<template>
  <div class="container">
    <button @click="isShow = !isShow">显示/隐藏</button>
    <!-- 过渡可以取名  name="hello" 
    如果这里指定了name,指定name可以设置不同的过渡效果  那么下面样式v-enter-active/v-leave-active都要变为hello-enter-active/hello-leave-active
    -->
    <!-- 这里:appear="true"也可以写成appear 指第一次就出现 -->
    <transition name="hello" :appear="true">
      <h1 class="content-text" v-show="isShow">显示内容</h1>
    </transition>

    <!-- transition只能使用一个元素 -->
    <transition name="fade" :appear="true">
      <h1 class="content-text-transition" v-show="isShow">显示内容</h1>
    </transition>

    <!-- transition-group多个元素过渡 -->
    <!-- <ul class="list-ul">
      <transition-group name="fade" :appear="true">
        <li v-for="item in listData" :key="item.id" v-show="item.show">
          {{ item.name }}<button @click="item.show = !item.show">toggle</button>
        </li>
      </transition-group>
    </ul> -->

    <!-- 结合animate.css库   https://animate.style/-->
    <!-- <transition
      name="animate__animated animate__bounce"
      enter-active-class="animate__swing"
      leave-active-class="animate__backOutUp"
      :appear="true"
    >
      <h1 class="content-text-transition" v-show="isShow">显示内容</h1>
    </transition> -->
  </div>
</template>

<script>
import "animate.css";
export default {
  components: {},
  data() {
    return {
      isShow: true,
      listData: [
        { id: 1, name: "显示内容1", show: true },
        { id: 2, name: "显示内容2", show: true },
        { id: 3, name: "显示内容3", show: true },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.container {
  .content-text {
    background-color: orange;
    color: #fff;
    margin: 20px auto;
  }
  .list-ul {
    li {
      width: 200px;
      height: 50px;
      box-sizing: border-box;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #efefef;
    }
  }
  //进入时的动画
  .hello-enter-active {
    animation: animate 1s linear;
  }

  .hello-leave-active {
    animation: animate 1s linear reverse;
  }

  @keyframes animate {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0px);
    }
  }

  .content-text-transition {
    background-color: orange;
    color: #fff;
    margin: 20px auto;
  }
  /*进入的起点,离开的终点 */
  .fade-enter,
  .fade-leave-to {
    transform: translateX(-100%);
  }
  /*进入的终点,离开的起点 */
  .fade-enter-to,
  .fade-leave {
    transform: translateX(0px);
  }
  /*进入/离开过程中  这个类可以被用来定义进入/离开过渡的过程时间，延迟和曲线函数。 */
  .fade-enter-active,
  .fade-leave-active {
    transition: 1s linear;
  }
  //   /*离开的起点 */
  //   .fade-leave {
  //     transform: translateX(0px);
  //   }
  //   /*离开的终点 */
  //   .fade-leave-to {
  //     transform: translateX(-100%);
  //   }
}
</style>
