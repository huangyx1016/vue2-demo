<!-- vue相关指令 -->
<template>
  <div class="container">
    <!-- 
        v-text和插值语法是一个意思，但是差值语法更灵活
        v-html有安全性问题
        在网站动态渲染任意html容易导致xss共计
        一定要在可信的内容上使用v-html 永远不要用在用户提交的内容上
     -->
    <div>{{ str }}</div>
    <div v-text="str"></div>
    <div>
      <h1>hello</h1>
    </div>
    <div v-html="str2"></div>

    <!-- v-cloak指令  解决网速过慢时页面展示出{{xxx}}的问题-->
    <div>
      <h2 v-cloak>{{ name }}</h2>
    </div>

    <div>
      <!-- v-once 在初次动态渲染后就视为静态内容了，只能渲染一次 以后数据改变不会引起v-once所在结果的更新，可用于优化性能 -->
      <p v-once>初始n是:{{ n }}</p>
      <p>当前的n是:{{ n }}</p>
      <div><el-button @click="n++">点击加1</el-button></div>
    </div>

    <div>
      <!-- v-pre指令：1、跳过其所在节点的编译过程 2、可利用它跳过：没有指令语法，没有插值语法的节点，会加快编译 -->
      <p v-pre>xxxxx</p>
      <p v-pre>当前的n是:{{ n }}</p>
      <div><el-button @click="n++">点击加1</el-button></div>
    </div>

    <div style="margin-top: 50px">
      <p v-text="n"></p>
      <!-- v-big 和v-text功能类似，但会把绑定的数值放大10倍 -->
      <span>放大10倍的值：</span><span v-big-number="n"></span>
      <div><el-button @click="n++">点击加1</el-button></div>
      <hr />
      <input type="text" v-fBind:value="n" />
    </div>

    <div style="margin-top: 50px">
      <!-- v-upper-text是全局自定义指令 -->
      <p v-upper-text="globalDirectivesUpper"></p>
    </div>

    <div style="margin-top: 50px">
      <!-- v-upper-text是全局自定义指令 -->
      <p v-lower-text="globalDirectivesLower"></p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      str: "hello",
      str2: "<h1>hello</h1>",
      name: "xx学校",
      n: 1,
      globalDirectivesUpper: "globalDirectivesUpperCase",
      globalDirectivesLower: "globalDirectivesLowerCase",
    };
  },
  //局部自定义指令  1、指定名定义时不加v- 使用是要加v- 2、指令码如果是多个单词，使用kebab-case命名方式不要用camelCase命名
  directives: {
    //element--元素,binding-绑定, 把指令和dom绑定
    //big函数何时会被调用？ 1、指令与元素成功绑定时 2、指令所在的模板被重新解析时
    //这是自定义指令简写
    "big-number"(element, binding) {
      console.log(element);
      console.log(binding);
      console.log("big-num", this); //注意，这里的this是window
      element.innerText = binding.value * 10;
      element.style.fontSize = "30px";
    },
    //这是完整的自定义指令
    fBind: {
      //当指令与元素成功绑定时
      bind(element, binding) {
        // console.log("bind");
        element.value = binding.value;
      },
      //指令所在元素被插入页面时调用
      inserted(element, binding) {
        // console.log("inserted");
        element.focus();
      },
      //指令所在的模板被重新解析时调用
      update(element, binding) {
        // console.log("update");
        element.value = binding.value;
        element.focus(); //这么写会保持焦点
      },
    },
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
  //属性选择器
  [v-clock] {
    display: none; //让所有有v-cloak的标签都隐藏
  }
}
</style>
