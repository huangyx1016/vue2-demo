<!-- vue 插槽的使用 -->
<template>
  <div class="container">
    <Category :listData="foods" :title="foodsTitle">
      <template>
        <div class="img-list-box">
          <img src="@/assets/logo.png" alt="" />
        </div>
      </template>
      <template v-slot:footer>
        <div class="link-box">
          <a href="">美食跳转链接</a>
        </div>
      </template>
      <!-- 作用域插槽 1 -->
      <!-- <template v-slot="{ data }">
        <div class="sales-box">
          <div
            class="sales-item-box"
            v-for="item in data.salesData"
            :key="item.id"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.sales }}</span>
          </div>
        </div>
      </template> -->
      <!-- 作用域插槽2 -->
      <!-- <template slot-scope="data2">
        <div class="sales-box">
          <div
            class="sales-item-box"
            v-for="item in data2.salesData"
            :key="item.id"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.sales }}</span>
          </div>
        </div>
      </template> -->
      <!-- 作用域插槽3 -->
      <template slot-scope="{ salesData, msg }" slot="sales">
        <div class="sales-box">
          <div class="sales-item-box" v-for="item in salesData" :key="item.id">
            <span>{{ item.name }}</span>
            <span>{{ item.sales }}</span>
          </div>
          <h4>{{ msg }}</h4>
        </div>
      </template>
    </Category>
    <Category :title="gamesTitle">
      <template>
        <ul class="category-list">
          <li class="ellipse" v-for="(item, index) in games" :key="index">
            {{ item }}
          </li>
        </ul>
      </template>
      <template #footer>
        <div class="link-box">
          <a href="">游戏跳转链接</a>
        </div>
      </template>
    </Category>
    <Category :listData="films" :title="filmsTitle">
      <template>
        <div class="video-box">
          <video
            controls
            src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
          ></video>
        </div>
      </template>
      <template v-slot:footer>
        <div class="link-box">
          <a href="">电影跳转链接</a>
        </div>
      </template>
    </Category>
  </div>
</template>

<script>
import Category from "./components/Category.vue";
export default {
  components: { Category },
  data() {
    return {
      foods: ["火锅", "烧烤", "炸鸡", "小龙虾", "牛排"],
      games: ["红色警戒红色警戒红色警戒", "穿越火线", "QQ飞车", "超级玛丽"],
      films: ["《教父》", "《拆弹专家》", "《变形金刚5》", "《生化危机5》"],
      foodsTitle: "美食",
      gamesTitle: "游戏",
      filmsTitle: "电影",
    };
  },
  computed: {},
  watch: {},
  methods: {
    getSameNum(Arr) {
      let result = []; //用于保存最后的结果
      //排序
      let arr = Arr.sort(function (a, b) {
        return a - b; //increse
      });
      //由于每次遍历访问Arr.length都是需要重复执行的，因此保存到len，提高效率
      let len = Arr.length;
      //遍历比较，看是否有相同的数字
      for (let i = 0; i < len - 1; i++) {
        if (Arr[i] === Arr[i + 1]) {
          result.push(Arr[i]);
        }
      }
      //去重，防止有三个相同的时，会多push一个相同数字
      return Array.from(new Set(result));
    },
    useIndexOf(Arr) {
      let len = Arr.length;
      let result = [];
      for (let i = 0; i < len; i++) {
        let curNum = Arr[i];
        //遍历到Arr[i]时，若在这个索引i之后都没找到相同数字，则indexOf会返回-1，说明改数字不存在重复
        if (Arr.indexOf(curNum, i + 1) != -1) {
          result.push(curNum);
        }
      }
      return Array.from(new Set(result));
    },
  },
  created() {},
  mounted() {
    let res = this.useIndexOf([1, 2, 1, 3, 4, 5, 2, 1]);
    console.log(res);
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-around;
}
</style>
