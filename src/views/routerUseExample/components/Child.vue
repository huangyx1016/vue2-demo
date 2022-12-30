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
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
