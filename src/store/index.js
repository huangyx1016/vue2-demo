import Vue from "vue";
import Vuex from "vuex"; //引入vuex

Vue.use(Vuex);
import user from "./module/user.js";
import login from "./module/login.js";
//vuex的基本使用
export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  //模块  每个模块有自己的state,getters,mutations,actions
  modules: {
    user, //user模块
    login, //login模块
  },
});
