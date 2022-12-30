<!-- dayjs 和 momentjs使用 -->
<template>
  <div class="container">
    <p>当前时间是：dayjs获取的时间{{ nowtime }}</p>
    <p>当前时间是：momentjs获取的时间{{ currentTime }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      nowtime: "",
      currentTime: "",
      timer: null,
    };
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    let _this = this;
    this.timer = setInterval(() => {
      _this.nowtime = this.$dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
      _this.currentTime = this.$moment(new Date()).format(
        "YYYY年MM月DD日 HH时mm分ss秒"
      );
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>
<style lang="scss" scoped>
.container {
  p {
    transition: 1s linear infinity;
  }
}
</style>
