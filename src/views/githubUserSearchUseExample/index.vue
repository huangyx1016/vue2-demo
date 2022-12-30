<!-- github 用户搜索实例 -->
<template>
  <div class="container">
    <Search
      :delay="3000"
      :loading="searchLoading"
      @search="searchHandle"
      @change="changeSearchInputHandle"
    />
    <List :userList="userList" v-loading="loading" />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import List from "./components/List.vue";
import axios from "axios";
export default {
  components: { Search, List },
  data() {
    return {
      userList: [
        // { id: 1, userName: "zhangsan" },
        // { id: 2, userName: "lisi" },
        // { id: 3, userName: "wangwu" },
        // { id: 4, userName: "zhangyisan" },
      ],
      loading: false, //列表加载的loading
      searchLoading: false, //搜索框的loading
    };
  },
  computed: {},
  watch: {},
  methods: {
    searchHandle(data) {
      console.log(data);
      this.getUserList(data);
    },
    getUserList(param) {
      this.loading = true;
      param = JSON.stringify(param);
      this.searchLoading = true;
      axios
        .get(`https://api.github.com/search/users?q=${param}`)
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            this.loading = false;
            this.searchLoading = false;
            this.userList = response.data.items; //赋值用户列表数据
          }
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
          this.searchLoading = false;
        });
    },
    changeSearchInputHandle(data) {
      this.searchHandle(data);
    },
    toUserHomePageHandle(data) {
      console.log(data);
      //window.location.href = data;
      window.open(data);
    },
  },
  created() {},
  beforeDestroy() {
    this.$bus.$off("toUserHomePage");
  },
  mounted() {
    //this.searchHandle("");
    this.getUserList(""); //获取用户列表
    this.$bus.$on("toUserHomePage", this.toUserHomePageHandle);
  },
};
</script>
<style lang="scss" scoped></style>
