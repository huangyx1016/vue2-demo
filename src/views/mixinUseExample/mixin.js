export const mixin = {
  data() {
    name: "mixin里的name";
  },
  methods: {
    showName() {
      this.$message.warning(this.name);
    },
  },
  mounted() {
    console.log("mixinjs里的mounted周期");
  },
};

export const mixin2 = {
  //配置data数据
  data() {
    return {
      x: 6,
      y: 6,
    };
  },
};
