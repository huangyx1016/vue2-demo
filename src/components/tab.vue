<template>
  <!-- 选项卡组件  -->
  <div class="tab-title">
    <!-- 选项卡变色  当选项卡下标等于index时  vue动态样式-->
    <div
      class="tab-titles"
      v-for="(item, index) in tabList"
      :key="index"
      :class="{ 'tab-active': tabIndex === index }"
      @click="setTabIndex(item, index)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  props: {
    //tab选项卡数据集合 tabList
    tabList: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: "7天内",
        },
        {
          id: 2,
          name: "15天内",
        },
        {
          id: 3,
          name: "1个月内",
        },
        {
          id: 4,
          name: "1个月内",
        },
        {
          id: 5,
          name: "半年内",
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
    /**设置选项卡下标
     * item 数据项 {id:"",name:""}
     * index 下标
     */
    setTabIndex(item, index) {
      console.log(item);
      console.log(index);
      if (index != this.tabIndex) {
        this.$emit("change", item); //子组件向父组件传递 change事件
        this.tabIndex = index; // 赋值选项卡下标
      }
    },
  },
};
</script>

<style scoped>
.tab-title {
  border-radius: 0.5rem;
}
.tab-title:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.tab-titles {
  height: 38px;
  line-height: 38px;
  float: left;
  padding-right: 22px;
  padding-left: 22px;
  cursor: pointer;
  font-size: 13px;
  color: whitesmoke;
  background-color: rgb(92, 92, 245);
  border: 0.1rem solid rgb(92, 95, 245);
  text-align: center;
  transition: all 0.3s ease-in-out;
}
.tab-titles:nth-of-type(1) {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.tab-titles:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.tab-active {
  background-color: rgb(22, 22, 218);
  color: #fff;
}
</style>
