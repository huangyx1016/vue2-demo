import router from "../router/index"; //引入路由route
import { MessageBox } from "element-ui"; //引入elementui的消息提示组件
import ElementUI from "element-ui"; //直接引入elemenui
import store from "@/store/index.js"; //引入vuex store仓库

//导出function
export function testFn() {
  // console.log("测试Fn");
}
export function testFn2() {
  // console.log("测试Fn2");
}
//跳转use路由页面
export function toUsePage() {
  router.push({ path: "/use" }); //js文件中进行路由的跳转
}
export function showMessage() {
  // MessageBox({
  //   message: "提示信息",
  //   type: "warning"
  // });

  //.js文件中使用Message/Notification/MessageBox组件
  //Message 消息提示
  ElementUI.Message({
    message: "恭喜你，这是一条成功消息",
    type: "success", //消息类型
  });
  //Notification 通知
  // ElementUI.Notification({
  //   title: '警告',
  //   message: '这是一条警告的提示消息',
  //   type: 'warning'
  // });
  // //MessageBox 弹框
  // ElementUI.MessageBox({
  //   title: '标题名称',
  //   message: '这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案这是提示文案'
  // });
}
export function updateUserAge() {
  //调用vuex里的方法
  store.commit("user/updateUserAge", 20);
}
export function getVuexGetters() {
  //这里想要调用vuex里的getters
  store.getters.user.getChildUsers; //报错
}
export function testPromise() {
  console.log("testPromise");
  const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
  });
  promise.then(() => {
    console.log(3);
  });
  promise.catch(() => {
    console.log("catch");
  });
  console.log(4);
}
