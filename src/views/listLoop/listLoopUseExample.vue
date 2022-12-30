<!-- 列表渲染 -->
<template>
  <div class="container">
    <div class="list-box">
      <!-- 遍历数组 -->
      <div class="list-box-items" v-for="item in listArr" :key="item.id">
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="list-box">
      <!-- 遍历对象 -->
      <div class="list-box-items" v-for="(value, key) of carObj" :key="key">
        <p>{{ value }}--{{ key }}</p>
      </div>
    </div>

    <div class="list-box">
      <!-- 遍历字符串 -->
      <div class="list-box-items" v-for="(chart, index) of str" :key="index">
        <p>{{ chart }}--{{ index }}</p>
      </div>
    </div>

    <div class="list-box">
      <!-- 遍历指定数字 -->
      <div class="list-box-items" v-for="(number, index) of 5" :key="index">
        <p>{{ number }}--{{ index }}</p>
      </div>
    </div>

    <el-button type="primary" @click="add">add</el-button>
    <div class="list-box">
      <!-- 遍历数组 -->
      <div class="list-box-items" v-for="item in listArr" :key="item.id">
        {{ item.name }}<input type="text" />
      </div>
    </div>

    <!-- 使用index作为key是会出现的问题  
    1、若对数据进行逆序添加、逆序删除等破坏顺序的操作会产生没有必要的真实DOM更新 ，界面没问题，但效率低
    2、若结构中还包含输入类的DOM，会产生错误DOM更新，界面有问题
     -->
    <div class="list-box">
      <!-- 遍历数组 -->
      <div class="list-box-items" v-for="(item, index) in listArr" :key="index">
        {{ item.name }}<input type="text" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      listArr: [
        { id: 1, name: "商品1", price: 30 },
        { id: 2, name: "商品2", price: 30 },
        { id: 3, name: "商品3", price: 30 },
        { id: 4, name: "商品4", price: 30 },
        { id: 5, name: "商品5", price: 30 },
        { id: 6, name: "商品6", price: 100 },
      ],
      carObj: {
        name: "宝马",
        price: "100w",
        color: "黑色",
      },
      str: "hello",
    };
  },
  computed: {},
  watch: {},
  methods: {
    add() {
      let obj = { id: 7, name: "商品7", price: 90 };
      this.listArr.unshift(obj);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.container {
  .list-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 20px;
    .list-box-items {
      flex: 0 1 20%; //flex:flex-grow:0()  flex-shrink:1 flex-basis:auto(项目的长度);
      background-color: aquamarine;
      color: #fff;
      height: 100px;
      // align-self: center;
      p {
        line-height: 100px;
        text-align: center;
      }
    }
  }
}
</style>
