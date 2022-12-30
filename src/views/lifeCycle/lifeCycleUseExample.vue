<!-- vue生命周期相关内容 -->
<template>
  <div class="container">
    <h1>vue生命周期</h1>
    <h2 :style="{ opacity: opacity }">{{ msg }}</h2>
    <h2>{{ n }}</h2>
    <button @click="add">点击+1</button>
    <button @click="destroyVm">点击销毁vm</button>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      msg: "欢迎学习vue",
      opacity: 1, //透明度
      n: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    add() {
      console.log("add");
      this.n++;
    },
    changeWord() {
      setInterval(() => {
        this.opacity -= 0.01;
        if (this.opacity <= 0) this.opacity = 1;
      }, 16);
    },
    destroyVm() {
      console.log("销毁vm");
      this.$destroy(); //销毁vue实例
    },
  },
  //在数据监测和数据代理完成前,此时无法通过vm访问到data里的数据、methods里的方法
  beforeCreate() {
    //创建前
    console.log("beforeCreate");
    //console.log(this); //这里的this都是vm
    //debugger;
  },
  //在数据监测、数据代理完成后，次吃可以通过vm访问到data里的数据、methods里的方法
  created() {
    //创建后
    console.log("created");
    // console.log(this);
  },
  //页面呈现的是未经vue编译的DOM结构，所有对DOM的操作，最终都不奏效
  beforeMount() {
    //挂载前
    console.log("beforeMount");
    //console.log(this);
  },

  //此时数据是新的，页面还是旧的  页面尚未和数据保持同步
  beforeUpdate() {
    console.log("beforeUpdate");
    console.log(this.n);
  },
  //此时数据是新的，页面也是新的  页面和数据保持一致
  updated() {
    console.log("updated");
  },
  //此时vm中所有的data、methods、指令等都处于可用状态
  //一般在此阶段关闭定时器、取消订阅消息、绑定自定义事件等收尾操作
  //一般不会在beforeDestroyed里面操作数据，因为此时操作数据也不会再触发更新流程了
  beforeDestroy() {
    //销毁前(常用)
    console.log("beforeDestroy");
  },
  //销毁后
  destroyed() {
    console.log("destroyed");
  },
  //vue完成模板的解析并把初始的真实DOM元素放入页面后调用  (挂载完毕)
  //此时页面显示的都是经过vue编译的真实DOM，这时对DOM的操作是有效的
  //一般在此进行开启定时器、发送网络请求、订阅消息、绑定自定义事件等初始化操作
  mounted() {
    //挂载后(常用)
    //this.changeWord();
  },
};
</script>
<style lang="scss" scoped></style>
