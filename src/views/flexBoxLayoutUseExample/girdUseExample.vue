<!-- grid布局使用 -->
<template>
  <div class="container">
    <div class="item" v-for="item in cardList" :key="item.id">
      {{ item.name }}
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
  display: grid;
  // 指定了一个三行三列的网格，列宽和行高都是100px。
  grid-template-columns: 100px 100px 100px; //
  grid-template-rows: 100px 100px 100px; //
  grid-template-areas:
    "a b c"
    "d e f"
    "g h i"; //网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。grid-template-areas属性用于定义区域。
  .item {
    background-color: red;
    text-align: center;
    line-height: 100px;
  }
}
</style>
