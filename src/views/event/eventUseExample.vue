<!-- vue事件处理 -->
<template>
  <div class="container">
    <!-- 点击事件 -->
    <el-button type="primary" @click="showInfo">点击提示</el-button>
    <el-button type="primary" @click="showInfo2($event)">点击提示</el-button>
    <!-- 
        1、prevent--阻止默认事件(常用)
        2、stop--阻止事件冒泡（常用）
        3、once--事件只触发一次（常用）
        4、capture--使用事件的捕获模式
        5、self -- 只有event.target是当前操作的元素时才触发事件
        6、passive -- 事件的默认行为立即执行，无需等待事件回调执行完毕
     -->
    <a href="http://www.baidu.com" @click.prevent="showMsg">点击</a>
    <!-- 阻止冒泡   捕获阶段由外到内，冒泡阶段由外到内-->
    <div class="demo1" @click="showMsg">
      <el-button type="primary" @click.stop="showMsg">点我提示</el-button>
    </div>
    <div>
      <!-- 只触发一次 -->
      <el-button type="primary" @click.once="showMsg">点我提示</el-button>
    </div>
    <!-- 只有event.target是当前操作的元素时才触发事件  -->
    <div class="demo1" @click.self="showMsg">
      <el-button type="primary" @click="showMsg">点我提示</el-button>
    </div>

    <div @scroll="scrollEvent" class="list">
      <div class="list-item">1</div>
      <div class="list-item">2</div>
      <div class="list-item">3</div>
      <div class="list-item">4</div>
      <div class="list-item">5</div>
    </div>
    <div @wheel="wheelEvent" class="list">
      <div class="list-item">1</div>
      <div class="list-item">2</div>
      <div class="list-item">3</div>
      <div class="list-item">4</div>
      <div class="list-item">5</div>
    </div>

    <div class="input-box">
      <input
        type="text"
        placeholder="请输入内容"
        v-model="name1"
        @keydown="keyDown"
      />
    </div>
    <div class="input-box">
      <!-- 
            vue常用按键别名
            回车 => enter
            删除 => delete
            退出 => esc
            空格 => space
            换行 => tab （特殊，要配合keydown使用）
            上 => up
            下 => down
            左 => left
            右 => right

            ctrl、shift、alt、meta(window键) 配合keyup需要按下修饰键的同时再按下其他键，随后释放其他键
            配合keydown使用：正常触发事件
         -->
      <input
        type="text"
        placeholder="请输入内容"
        v-model="name2"
        @keyup="keyUp"
      />
      <!-- 如果是有大小写的key名 要写成小写连接符用-连接 例如 keyup.capsLock 要写成 keyup.caps-lock -->
    </div>
    <div class="input-box">
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="name3"
        @change="handleInputChange"
      ></el-input>
    </div>

    <el-button type="primary" @keyup.enter.native="keyUpHandle"
      >回车登录</el-button
    >
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name1: "",
      name2: "",
      name3: "",
    };
  },
  computed: {},
  watch: {},
  methods: {
    showInfo() {
      this.$message.warning("hello!");
    },
    showInfo2(e) {
      console.log(e);
    },
    showMsg(e) {
      //e.preventDefault(); //js阻止默认事件
      this.$message.success("阻止默认事件");
    },
    scrollEvent() {
      console.log("滚动条滚动");
    },
    wheelEvent() {
      console.log("滚轮滚动");
    },
    keyDown(e) {
      console.log("键盘按下后不抬起");
      console.log(e.keyCode);
    },
    //常用keyUp
    keyUp(e) {
      //if (e.keyCode !== 13) return;

      console.log("键盘按下后抬起");
      console.log("keyCode:" + e.keyCode);
      console.log("key:" + e.key);
    },
    keyUpHandle(e) {
      console.log("keyUpHandle");
      console.log("e", e);
      // if (e.key === "Enter") {
      //   this.login();
      // }
    },

    handleInputChange() {
      console.log("输入框失去焦点或者用户按下回车时触发");
    },
  },
  created() {},
  mounted() {
    document.addEventListener("keyup", this.keyUpHandle);
  },
};
</script>
<style lang="scss" scoped>
$--color-second: rgb(67, 146, 236);
$--color-primary: skyblue;
.container {
  .demo1 {
    background-color: skyblue;
    margin: 10px auto;
    height: 100px;
    display: flex;
    // justify-content: center;
    align-items: center;
  }
  .list {
    height: 200px;
    width: 200px;
    border: 1px solid #333;
    overflow: auto;
    .list-item {
      width: 100%;
      height: 50px;
    }
    scrollbar-width: 10px !important; // 火狐浏览器无法自定义宽度，只能通过此属性使滚动条宽度变细
    -ms-overflow-style: 10px !important; // IE和edge两个浏览器中很难更改样式，因此隐藏滚动条
    &::-webkit-scrollbar {
      width: 10px !important;
    }
    &::-webkit-scrollbar-track {
      // 滚动条轨道
      border-radius: 1px !important;
      background-color: transparent !important;
    }
    &::-webkit-scrollbar-thumb {
      // 滚动条滑块
      border-radius: 10px !important;
      background-color: $--color-second;
      &:hover {
        background-color: $--color-primary;
      }
    }
  }
  .input-box {
    width: 200px;
    margin: 10px 0;
  }
}
</style>
