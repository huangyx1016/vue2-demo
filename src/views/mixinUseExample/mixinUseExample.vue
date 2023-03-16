<!-- vue mixin(混入) -->
<template>
  <div class="container">
    <School />
    <!-- <Student /> -->
  </div>
</template>

<script>
import School from "./components/School.vue";
import Student from "./components/Student.vue";
export default {
  components: { School, Student },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {
    // this.$tipInfo();
  },
};
</script>
<style lang="scss" scoped></style>
