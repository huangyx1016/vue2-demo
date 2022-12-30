<!-- List组件 -->
<template>
  <div class="list-box">
    <ListItem
      v-for="item in userList"
      :key="item.id"
      :listItem="item"
      v-show="userList.length"
    />
    <div class="no-data-tip" v-show="!userList.length">暂无数据</div>
  </div>
</template>

<script>
import ListItem from "./ListItem.vue";
export default {
  components: { ListItem },
  props: {
    userList: {
      type: Array,
      required: true,
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
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.list-box {
  width: 80%;
  max-height: 732px;
  overflow: auto;
  padding: 20px;
  margin: 100px auto 0;
  display: flex;
  flex-wrap: wrap;
  background-color: aliceblue;
  .no-data-tip {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
