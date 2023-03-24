<!-- 自适应卡片  媒体查询结合弹性布局实现 -->
<template>
  <div class="container">
    <div class="card-wrap">
      <!-- <div class="card-add card-context">+</div> -->
      <!-- vue的遍历，目的是创造data.length个数的card -->
      <div class="card-context" v-for="item in dataList" :key="item.id">
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
      dataList: [
        { id: 1, name: "card1" },
        { id: 2, name: "card2" },
        { id: 3, name: "card3" },
        { id: 4, name: "card4" },
        { id: 5, name: "card5" },
        { id: 6, name: "card6" },
        { id: 7, name: "card7" },
        { id: 8, name: "card8" },
        { id: 9, name: "card9" },
        { id: 10, name: "card10" },
        { id: 11, name: "card11" },
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
@media (min-width: 1200px) {
  .container {
    .card-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
    }
    .card-context {
      flex: 0 0 calc((100% - 80px) / 5);
      height: 100px;
      line-height: 100px;
      text-align: center;
      border: 1px solid skyblue;
      box-sizing: border-box;
    }
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .container {
    .card-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
    }
    .card-context {
      flex: 0 0 calc((100% - 60px) / 4);
      height: 100px;
      line-height: 100px;
      text-align: center;
      border: 1px solid skyblue;
      box-sizing: border-box;
    }
  }
}
@media (min-width: 769px) and (max-width: 991px) {
  .container {
    .card-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
    }
    .card-context {
      flex: 0 0 calc((100% - 40px) / 3);
      height: 100px;
      line-height: 100px;
      text-align: center;
      border: 1px solid skyblue;
      box-sizing: border-box;
    }
  }
}
@media (max-width: 768px) {
  .container {
    .card-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
    }
    .card-context {
      flex: 0 0 calc((100% - 20px) / 2);
      height: 100px;
      line-height: 100px;
      text-align: center;
      border: 1px solid skyblue;
      box-sizing: border-box;
    }
  }
}
</style>
