<!-- 列表过滤 -->
<template>
  <div class="container">
    <div class="content">
      <div class="tool-box">
        <el-input
          type="text"
          style="width: 200px"
          placeholder="输入关键词"
          :prefix-icon="loading ? 'el-icon-loading' : 'el-icon-search'"
          v-model="keyWord"
          :disabled="disabled ? loading : disabled"
          @input="handlerInputChange"
          @keyup.enter.native="searchHandle"
        ></el-input>
        <el-button @click="searchRes">搜索</el-button>
        <el-button @click="sortType = 2">价格升序</el-button>
        <el-button @click="sortType = 1">价格降序</el-button>
        <el-button @click="sortType = 0">恢复默认顺序</el-button>
      </div>
      <div class="list-box">
        <!-- 遍历数组 -->
        <div
          class="list-box-items"
          v-for="item in filterListArr"
          :key="item.id"
        >
          <p>{{ item.name }} -- {{ item.price }}</p>
          <el-input v-show="isEdit" type="text" v-model="item.name"> </el-input>
          <el-button type="primary" @click="updateData(item)">编辑</el-button>
        </div>
      </div>
      <div class="list-box">
        <!-- 遍历数组 -->
        <div
          class="list-box-items"
          v-for="item in filterListArr2"
          :key="item.id"
        >
          <p>{{ item.name }} -- {{ item.price }}</p>
          <el-input v-show="isEdit" type="text" v-model="item.name"> </el-input>
          <el-button type="primary" @click="updateData(item)">编辑</el-button>
        </div>
      </div>
      <div class="save-box">
        <el-button @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      // 相同的修改 鼠标移到要修改的位置 ctrl+shift+l
      //alt+shift 加鼠标点击要修改的行
      listArr: [
        { id: 1, name: "iphone", price: 30 },
        { id: 2, name: "miphone", price: 50 },
        { id: 3, name: "华为phone", price: 20 },
        { id: 4, name: "vivophone", price: 80 },
        { id: 5, name: "oppophone", price: 10 },
        { id: 6, name: "华为phonefold", price: 100 },
      ],
      keyWord: "",
      sortType: 0, //0-原顺序，1-降序，2-升序
      curListNameInput: "",
      filterListArr2: [],
      isEdit: false,
      loading: false,
      timer: null,
      disabled: false,
    };
  },
  computed: {
    //当计算属性和watch都能实现时 使用computed计算属性更好
    filterListArr() {
      const list = this.listArr.filter((item) => {
        return item.name.indexOf(this.keyWord) !== -1;
      });
      if (this.sortType !== 0) {
        list.sort((a, b) => {
          return this.sortType === 1 ? b.price - a.price : a.price - b.price; //升序
        });
      }
      return list;
    },
  },
  watch: {
    //#region
    // keyWord: {
    //   handler(val) {
    //     let filterArr = this.listArr.filter((item) => {
    //       return item.name.indexOf(val) !== -1;
    //     });
    //     this.filterListArr = filterArr;
    //   },
    //   immediate: true,
    // },
    //#endregion
  },
  methods: {
    updateData(data) {
      console.log(data);
      this.isEdit = true;
    },
    save() {
      this.isEdit = false;
    },
    //在 Input 值改变时触发的事件
    handlerInputChange(val) {
      //console.log(val);
      this.debounce(function () {}, 1000);
    },
    //防抖
    debounce(fn, delay) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(fn, delay);
    },
    searchHandle() {
      console.log("结果搜索");
      this.loading = !this.loading;
      this.disabled = !this.disabled;
      setTimeout(() => {
        this.loading = false;
        this.disabled = false;
      }, 3000);
    },
    searchRes() {
      var _this = this;
      _this.debounce(function () {
        _this.searchHandle();
      }, 1000);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.container {
  .content {
    display: flex;
    flex-wrap: wrap;
    .tool-box {
      width: 100%;
      margin: 20px auto;
    }
    .list-box {
      display: flex;
      width: 500px;
      padding: 0 0 0 50px;
      flex-direction: column;
      justify-content: flex-start;
      margin-bottom: 20px;
      .list-box-items {
        flex: 0 1 20%; //flex:flex-grow:0()  flex-shrink:1 flex-basis:auto(项目的长度);
        color: #333;
        height: 100px;
        position: relative;
        // align-self: center;
        p {
          line-height: 100px;
          display: inline-block;
          width: 150px;
        }
        ::v-deep .el-button {
          position: absolute;
          top: 50%;
          right: 20px;
          transform: translate(0, -50%);
        }
        ::v-deep .el-input {
          width: 250px;
          margin-right: 20px;
        }
      }
    }
    .save-box {
      width: 100%;
    }
  }
}
</style>
