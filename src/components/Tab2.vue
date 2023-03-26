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
      <!-- <div class="bottom-box" :class="{ active: tabIndex === index }"></div> -->
    </div>
    <div
      class="bottom-box"
      :style="{ transform: `translate(${82 * tabIndex}px)` }"
    ></div>
    <!-- <div
      style="
        width: 100px;
        height: 100px;
        background: linear-gradient(45deg, skyblue, yellow) no-repeat bottom;
      "
    ></div> -->
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
      console.log(index);
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
  position: relative;
  .tab-items {
    height: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
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
      //transition: background-position-x 1s linear;
    }
    .highlight {
      color: rgb(9, 137, 187);
      // transition: background-position-x 1s linear;
    }
  }
  .bottom-box {
    width: 82px;
    //width: 100%;
    height: 2px;
    position: absolute;
    bottom: 0;
    // background: linear-gradient(to right, skyblue, skyblue) no-repeat bottom;
    background-color: rgb(41, 41, 212);
    transition: transform 0.5s;
    // background-size: 82px 2px;
    // transition: background-position-x 0.5s linear;
  }
}
</style>
