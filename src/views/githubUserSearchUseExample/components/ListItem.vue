<!-- ListItem组件 -->
<template>
  <div class="list-item-box">
    <div class="user-head-img" @click="toUserHomePage(listItem.html_url)">
      <img :src="listItem.avatar_url" alt="" />
    </div>
    <p class="user-name-text">{{ listItem.login }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    listItem: {
      type: Object,
    },
    // loading: {
    //   type: Boolean,
    // },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    toUserHomePage(data) {
      this.$bus.$emit("toUserHomePage", data);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.list-item-box {
  flex: 0 1 33.3%;
  //   margin-right: 20px;
  border: 1px solid #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  //   &:nth-child(3n) {
  //     margin-right: 0;
  //   }
  .user-head-img {
    width: 100px;
    height: 100px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user-name-text {
    margin-top: 20px;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>
