<!--  -->
<template>
  <div class="">
    <ButtonDialog
      btn-label="按钮"
      title="dialog标题"
      width="700px"
    ></ButtonDialog>
    <LoadBtn type="primary" @click="handleClickBtn">防抖按钮</LoadBtn>
  </div>
</template>

<script>
import ButtonDialog from "./components/ButtonDialog.vue";
import LoadBtn from "@/components/LoadBtn.vue";
export default {
  components: {
    ButtonDialog,
    LoadBtn,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    /**
     *
     * @param {*} cancel 取消按钮的loading
     */
    handleClickBtn(cancel) {
      console.log("点击防抖按钮");
      setTimeout(cancel, 2000);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
