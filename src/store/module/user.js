//导出user模块
export default {
  name: "user", //模块名称
  namespaced: true, //开启命名空间
  //类似于vue里的data
  state: {
    userName: "zhangsan",
    userList: [
      { id: 1, name: "zhangsan", age: 16 },
      { id: 2, name: "lisi", age: 15 },
      { id: 3, name: "wangwu", age: 25 },
      { id: 4, name: "zhaoliu", age: 26 },
    ], //用户列表
    age: 18, //年龄
  },
  //主要对state里的变量做一些筛选过滤
  //类似于computed( 当state里的数据需要经过加工后再使用时，并且组件里需要复用,可以用getters加工)
  getters: {
    getAdultUsers(state, payload) {
      return state.userList.filter((item) => item.age > 18);
    },
    getChildUsers(state, payload) {
      console.log("获取未成年用户");
      return state.userList.filter((item) => item.age < 18);
    },
  },
  //同步操作  要修改state的值必须要使用mutations
  mutations: {
    //payload 提交负荷/传递的参数
    updateUserName(state, payload) {
      state.userName = payload;
    },
    updateUserAge(state, payload) {
      state.age = payload;
    },
  },
  //异步操作 主要是触发mutations里的方法  如果有一些判断，逻辑就调用actions里的方法
  actions: {
    updateUserName({ commit }, data) {
      commit("updateUserName", data); //这里是触发mutations里的updateUserName方法
    },
    updateAge(context, data) {
      console.log(context);
      console.log(data);
    },
  },
};
