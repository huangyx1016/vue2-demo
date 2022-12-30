import { mixin2 } from "@/views/mixinUseExample/mixin.js";
import { MessageBox } from "element-ui"; //引入elementui的消息提示组件
//插件 这里面可以写mixin混入、自定义指令、原型对象等
//用于增强vue
export default {
  //这里的install(Vue,option)后面可以带参数
  install(Vue) {
    //mixin 混入
    Vue.mixin({
      //配置data数据
      data() {
        return {
          z: 6,
        };
      },
    });
    Vue.mixin(mixin2);

    //自定义指令
    Vue.directive("upper-text", {
      //当指令与元素成功绑定时
      bind(element, binding) {
        console.log(element);
        console.log(binding);
        element.innerText = binding.value.toUpperCase();
      },
      //指令所在元素被插入页面时调用
      inserted(element, binding) {
        console.log("inserted");
      },
      //指令所在的模板被重新解析时调用
      update(element, binding) {
        console.log("update");
      },
    });

    //定义全局自定义指令 简写方法
    Vue.directive("lower-text", (element, binding) => {
      element.innerHTML = binding.value.toLowerCase();
    });

    //绑定原型链
    Vue.prototype.$tipInfo = () => {
      //   MessageBox({
      //     message: "提示信息",
      //     type: "warning",
      //   });
      console.log("$tipInfo原型对象");
    };
  },
};
