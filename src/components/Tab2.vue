<template>
  <!-- 选项卡组件 -->
  <div class="tabs">
    <div
      class="tab-items"
      v-for="(item, index) in tabList"
      :key="index"
      @click="setTabIndex(item, index)"
    >
      <p class="tab-item-name" :class="{ highlight: tabIndex === index }">
        {{ item.name }}
      </p>
      <div class="bottom-box" :class="{ active: tabIndex === index }"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: "Tab1",
        },
        {
          id: 2,
          name: "Tab2",
        },
        {
          id: 3,
          name: "Tab3",
        },
        {
          id: 4,
          name: "Tab4",
        },
        {
          id: 5,
          name: "Tab5",
        },
      ],
    },
  },
  data() {
    return {
      tabIndex: 0, //选项卡下标
    };
  },
  methods: {
    // 设置选项卡下标
    setTabIndex(item, index) {
      if (index != this.tabIndex) {
        this.$emit("change", item);
        this.tabIndex = index; // 赋值选项卡下标
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  .tab-items {
    width: 48px;
    height: 100%;
    line-height: 40px;
    position: relative;
    cursor: pointer;
    .tab-item-name {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      text-align: center;
    }
    .active {
      background: skyblue;
    }
    .highlight {
      color: rgb(9, 137, 187);
    }
    .bottom-box {
      height: 2px;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
