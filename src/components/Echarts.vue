<!-- echarts组件使用 -->
<template>
  <div ref="chart" class="chart-container"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  components: {},
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      myChart: null,
    };
  },
  computed: {},
  watch: {
    option: {
      handler(newValue, oldValue) {
        this.myChart.setOption(newValue);
      },
      // 因为option是个对象，而我们对于echarts的配置项，要更改的数据往往不在一级属性里面
      // 所以这里设置了deep:true，vue文档有说明
      deep: true,
    },
  },
  methods: {
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.chart);
      this.myChart.setOption(this.option);
      // 添加窗口改变监听
      this.myChart._resize = () => {
        this.myChart.resize();
      };
      window.addEventListener("resize", this.myChart._resize);
    },
  },
  created() {},
  beforeDestroy() {
    // 移除窗口改变监听
    window.removeEventListener("resize", this.myChart._resize);
  },
  mounted() {
    this.initEcharts();
  },
};
</script>
<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid black;
}
</style>
