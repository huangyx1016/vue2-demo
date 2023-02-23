<!-- echarts简单使用 -->
<template>
  <div class="container">
    <div class="chart-box">
      <Echarts :option="chartOption"></Echarts>
    </div>
  </div>
</template>

<script>
import Echarts from "@/components/Echarts.vue";
export default {
  components: { Echarts },
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      },
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
  width: 100%;
  .chart-box {
    width: 700px;
    height: 500px;
    box-sizing: border-box;
  }
}
</style>
