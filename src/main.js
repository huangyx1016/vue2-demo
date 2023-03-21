import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //引入vue-router路由
import store from "./store"; //引入vuex

import "@/style/index.scss";
import moment from "moment"; //引入momentjs
Vue.prototype.$moment = moment; //vue实例全局挂载moment方法

import dayjs from "dayjs"; //引入dayjs
Vue.prototype.$dayjs = dayjs; //vue实例全局挂载dayjs方法

import globalCom from "@/views/componentUseExample/components/globalCom.vue";

// import { mixin, mixin2 } from "@/views/mixinUseExample/mixin.js";

// //全局混入
// Vue.mixin(mixin);
// Vue.mixin(mixin2);

//引入插件
// import plugin from "@/views/pluginUseExample/plugin.js";
// //使用全局插件
// Vue.use(plugin);

//引入element ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

//关闭vue的生产提示
Vue.config.productionTip = false;
Vue.use(ElementUI);

// //定义全局自定义指令  完整方法
// Vue.directive("upper-text", {
//   //当指令与元素成功绑定时
//   bind(element, binding) {
//     console.log(element);
//     console.log(binding);
//     element.innerText = binding.value.toUpperCase();
//   },
//   //指令所在元素被插入页面时调用
//   inserted(element, binding) {
//     console.log("inserted");
//   },
//   //指令所在的模板被重新解析时调用
//   update(element, binding) {
//     console.log("update");
//   },
// });

// //定义全局自定义指令 简写方法
// Vue.directive("lower-text", (element, binding) => {
//   element.innerHTML = binding.value.toLowerCase();
// });

// Vue.directive("focus", {
//   // bind(element, binding) {},
//   inserted(element, binding) {
//     console.log("自动获取焦点");
//     element.children[0].focus();
//   },
//   // update(element, binding) {
//   //   element.focus();
//   // },
// });

//定义全局子组件
Vue.component("globalCom", globalCom);

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; //安装全局事件总线  this就是当前应用的vm
    // console.log(Vue.prototype);
  },
}).$mount("#app");
