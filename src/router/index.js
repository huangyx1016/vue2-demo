import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import { MessageBox, Message } from "element-ui"; //引入elementui的消息提示组件
Vue.use(VueRouter);

const routes = [
  {
    path: "/", //
    name: "home", //
    component: HomeView, //组件
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/commonUseExample", //vue 公共组件使用
    name: "commonUseExample",
    component: () => import("../views/component-use-example/tab-example.vue"),
    meta: { isAuth: true },
    //独享路由守卫   (独享路由守卫只有前置没有后置)
    //独享路由守卫可以和全局后置守卫配合来用
    // beforeEnter: (to, from, next) => {
    //   if (to.meta.isAuth) {
    //     //判断是否需要进行权限效验
    //     if (localStorage.getItem("school") === "xxx") {
    //       next();
    //     } else {
    //       //消息提示
    //       Message({
    //         message: "您没有该权限",
    //         type: "warning",
    //       });
    //     }
    //   }
    // },
  },
  {
    path: "/use",
    name: "use",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/useView.vue"),
  },
  {
    path: "/vuex",
    name: "vuexUse",
    component: () => import("../views/vuexUse.vue"), //vuex的使用
  },
  {
    path: "/uniapp",
    name: "uniappAbout",
    component: () => import("../views/uniappAbout.vue"),
  },
  {
    path: "/example",
    name: "componentsExampleView",
    component: () => import("../views/componentsExampleView.vue"),
  },
  {
    path: "/eventExample", //vue事件相关
    name: "eventExample",
    component: () => import("../views/event/eventUseExample.vue"),
  },
  {
    path: "/computedUseExample", //vue计算属性w
    name: "computedUseExample",
    component: () => import("../views/computed/computedUse.vue"),
  },
  {
    path: "/watchUseExample", //vue监听属性
    name: "watchUseExample",
    component: () => import("../views/watch/watchUseExample.vue"),
  },
  {
    path: "/classUseExample", //vue动态样式和动态style
    name: "classUseExample",
    component: () => import("../views/class/classUseExample.vue"),
  },
  {
    path: "/listLoopUseExample", //vue列表循环
    name: "listLoopUseExample",
    component: () => import("../views/listLoop/listLoopUseExample.vue"),
  },
  {
    path: "/listFilterUseExample", //vue列表过滤
    name: "listFilterUseExample",
    component: () => import("../views/listLoop/listFilterUseExample.vue"),
  },
  {
    path: "/setUseExample", //vue this.$set()方法
    name: "setUseExample",
    component: () => import("../views/listLoop/setUseExample.vue"),
  },
  {
    path: "/momentAndDayjsUseExample", //js格式化事件相关 dayjs、momentjs
    name: "momentAndDayjsUseExample",
    component: () =>
      import("../views/dateUseExample/momentAndDayjsUseExample.vue"),
  },
  {
    path: "/instructUseExample", //vue自定义指令
    name: "instructUseExample",
    component: () =>
      import("../views/instructionsUseExample/instructUseExample.vue"),
  },
  {
    path: "/lifeCycleUseExample", //vue声明周期
    name: "lifeCycleUseExample",
    component: () => import("../views/lifeCycle/lifeCycleUseExample.vue"),
  },
  {
    path: "/componentUseExample", //vue组件
    name: "componentUseExample",
    component: () =>
      import("../views/componentUseExample/componentUseExample.vue"),
  },
  {
    path: "/mixinUseExample", //vue mixin（混入）
    name: "mixinUseExample",
    component: () => import("../views/mixinUseExample/mixinUseExample.vue"),
  },
  {
    path: "/toDoListUseExample", //vue toDoList
    name: "toDoListUseExample",
    component: () =>
      import("../views/toDoListUseExample/toDoListUseExample.vue"),
  },
  {
    path: "/customEventsUseExample", //vue 自定义事件
    name: "customEventsUseExample",
    component: () =>
      import("../views/customEventsUseExample/customEventsUseExample.vue"),
  },
  {
    path: "/globalEventUseExample", //vue 自定义事件
    name: "globalEventUseExample",
    component: () =>
      import("../views/globalEventBusUseExample/globalEventUseExample.vue"),
  },
  {
    path: "/messageSubscribeAndPublishUseExample", //vue 消息订阅与发布
    name: "messageSubscribeAndPublishUseExample",
    component: () =>
      import(
        "../views/messageSubscribeAndPublishUseExample/messageSubscribeAndPublishUseExample.vue"
      ),
  },
  {
    path: "/transitionUseExample", //vue 过渡动画效果
    name: "transitionUseExample",
    component: () =>
      import("../views/transitionUseExample/transitionUseExample.vue"),
  },
  {
    path: "/axiosUseExample", //vue axios
    name: "axiosUseExample",
    component: () => import("../views/axiosUseExample/axiosUseExample.vue"),
  },
  {
    path: "/githubUserSearchUseExample", //vue github用户搜索组件
    name: "githubUserSearchUseExample",
    component: () => import("../views/githubUserSearchUseExample/index.vue"),
  },
  {
    path: "/slotUseExample", //vue 插槽
    name: "slotUseExample",
    component: () => import("../views/slotUseExample/slotUseExample.vue"),
  },
  {
    path: "/routerUseExample", //vue 路由
    name: "routerUseExample",
    meta: { isAuth: false }, //路由元信息  用于标识是否进行权限效验
    component: () => import("../views/routerUseExample/routerUseExample.vue"),
    children: [
      {
        path: "child", //嵌套路由的path里面不用加/
        name: "child", //路由名称
        component: () =>
          import("../views/routerUseExample/components/Child.vue"),
        //props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件。
        // props:{a:1,b:'hello'}

        //props的第二种写法，值为布尔值，若布尔值为真，就会把该路由组件收到的所有params参数，以props的形式传给Detail组件。
        //props: true,

        //props的第三种写法，值为函数
        props($route) {
          return {
            // id: $route.query.id,
            // title: $route.query.title,
            a: 1,
            b: "hello",
          };
        },
      },
    ],
  },
  {
    path: "/echartsUseExample", //vue echarts使用
    name: "echartsUseExample",
    component: () => import("../views/echartsUseExample/index.vue"),
  },
];

//创建一个路由实例
const router = new VueRouter({
  //history模式(history模式更好)
  //hash模式(默认是hash模式,带#号，最大特点就是路径上的hash值不会作为路径的一部分发给服务器)
  //hash模式兼容性略差
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition);
    console.log(to, from);
    if (savedPosition) {
      console.log("savedPosition存在");
      return savedPosition;
    } else {
      console.log("savedPosition不存在");
      return { x: 0, y: 0 };
    }
  },
});
console.log("环境", process.env.BASE_URL);

//重置路由
// export const routerObj = router();
// export function resetRouter() {
//   const newRouter = router();
//   routerObj.matcher = newRouter.matcher;
// }

//全局前置路由守卫(主要是为了效验权限)  初始化时被调用、在每次路由切换之前调用
/**
 * to:即将要进入的目标 路由对象
 * from:当前导航正要离开的路由
 * next() 放行
 */
// router.beforeEach((to, from, next) => {
//   console.log("全局前置路由守卫");
//   console.log(to, from);
//   if (to.meta.isAuth) {
//     //判断是否需要进行权限效验
//     if (localStorage.getItem("school") === "xxx") {
//       next();
//     } else {
//       //消息弹窗
//       // MessageBox({
//       //   title: "您没有权限",
//       //   type: "warning",
//       // });

//       //消息提示
//       Message({
//         message: "您没有该权限",
//         type: "warning",
//       });
//     }
//   }
// });

//全局后置路由守卫   初始化时被调用、每次路由切换后被调用
// router.afterEach((to, from) => {
//   console.log(to, from);
//   console.log("全局后置路由守卫");
//   document.title = to.meta.title || "elementui-demo";
// });

export default router;
