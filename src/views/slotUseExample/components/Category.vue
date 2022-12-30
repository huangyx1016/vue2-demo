<!-- 分类组件 -->
<template>
  <div class="category-box">
    <div class="title-box">{{ title }}</div>
    <!-- 定义一个匿名插槽(默认插槽) -->
    <slot></slot>
    <slot name="footer"></slot>
    <!-- <ul class="category-list">
      <li v-for="(item, index) in listData" :key="index">{{ item }}</li>
    </ul> -->
    <!-- 作用域插槽 让数据从Category组件里传到slotUseExample里 -->
    <slot name="sales" :salesData="salesInfo" msg="hello"></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    //列表数据
    listData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      salesInfo: [
        { id: 1, name: "美食类", sales: 99 },
        { id: 2, name: "游戏类", sales: 50 },
        { id: 3, name: "电影类", sales: 150 },
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.category-box {
  width: 200px;
  height: 400px;
  box-sizing: border-box;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  .title-box {
    background-color: aquamarine;
    padding: 10px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .sales-box {
    flex: 1;
    .sales-item-box {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #333;
    }
  }
  .category-list {
    li {
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid gray;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
    }
  }
  .img-list-box {
    width: 100%;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .video-box {
    width: 100%;
    height: 200px;
    video {
      width: 100%;
      height: 100%;
    }
  }
  .link-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    a {
      text-decoration: none;
    }
  }
}
</style>
