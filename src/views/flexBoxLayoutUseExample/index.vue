<!-- flex多行均列布局 -->
<template>
  <div>
    <div style="margin-left: 20px; font-size: 25px">弹性布局实现</div>
    <!-- 弹性布局实现 -->
    <div class="container">
      <div class="item" v-for="item in cardList" :key="item.id">
        {{ item.name }}
      </div>
    </div>
    <div style="margin-left: 20px; font-size: 25px">grid布局实现</div>
    <div class="grid-container">
      <div class="item" v-for="item in cardList" :key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cardList: [
        { id: 1, name: "卡片1" },
        { id: 2, name: "卡片2" },
        { id: 3, name: "卡片3" },
        { id: 4, name: "卡片4" },
        { id: 5, name: "卡片5" },
        { id: 6, name: "卡片6" },
        { id: 7, name: "卡片7" },
        { id: 8, name: "卡片8" },
        { id: 9, name: "卡片9" },
        { id: 10, name: "卡片10" },
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
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  .item {
    //flex: 0 0 calc((父元素宽度 - 列之间的宽度 * (列数-1)) / 列数);
    //flex:0 1 auto;  flex-grow(如果存在剩余空间，也不放大。默认为0) flex-shrink(如果空间不足，该项目将缩小。默认为1)  flex-basis(item的占据空间大小)
    flex: 0 0 calc((100% - 60px) / 4);
    height: 200px;
    line-height: 200px;
    text-align: center;
    background-color: red;
    align-self: center;
  }
}
.grid-container {
  width: 100%;
  box-sizing: border-box;
  height: auto;
  /* 使用grid布局*/
  display: grid;
  grid-row-gap: 20px; //行间距
  grid-column-gap: 20px; //列间距
  grid-template-columns: repeat(4, 1fr); //设置每行4列宽度一样
  padding: 10px;
  .item {
    background-color: red;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
}
</style>
