<!--  -->
<template>
  <div class="">
    子组件
    <p>{{ a }}</p>
    <p>{{ b }}</p>
  </div>
</template>

<script>
export default {
  props: ["a", "b"],
  name: "Child",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    console.log("child", this.$route);
    console.log("query", this.$route.query.id);
    console.log("params", this.$route.params.id);
  },
};
</script>
<style lang="scss" scoped></style>
