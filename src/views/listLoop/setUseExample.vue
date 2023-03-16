<!-- vue set()方法 -->
<template>
  <div class="container">
    <h1 class="current-time" :class="{ active: isActived }">
      {{ currentTime }}
    </h1>
    <h1>现在是:{{ formateTime }}</h1>
    <h1>学校信息</h1>
    <h2>学校名称：{{ schoolName }}</h2>
    <h2>学校地址:{{ schoolAddress }}</h2>
    <hr />
    <button @click="addSex">点击添加一个student的sex属性</button>
    <button @click="deleteSex">点击删除一个student的sex属性</button>
    <h1>学生信息</h1>
    <h2>姓名：{{ student.name }}</h2>
    <h2 v-if="student.sex">性别：{{ student.sex }}</h2>
    <h2>年龄：{{ student.age.rage }}</h2>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      schoolName: "xx学校",
      schoolAddress: "厦门市",
      student: {
        name: "zhangsan",
        age: {
          rage: 40,
          sage: 29,
        },
        hobby: ["打篮球", "跑步", "玩游戏"],
        friends: [
          { name: "jerry", age: 35 },
          { name: "tony", age: 36 },
        ],
        timer: null,
      },
      currentTime: "",
      isActived: false,
    };
  },
  // 局部过滤器
  filters: {},
  computed: {
    formateTime() {
      return this.$dayjs().format("YYYY年MM月DD日 HH时:mm分:ss秒");
    },
  },
  watch: {
    currentTime: {
      handler(val) {
        // var _this = this;
        // setInterval(() => {
        //   console.log("每秒获取一次当前时间");
        //   _this.currentTime = _this
        //     .$dayjs(new Date())
        //     .format("YYYY年-MM月-DD日 HH时:mm分:ss秒");
        //   console.log(_this.currentTime);
        // }, 1000);
        if (val) {
          this.isActived = !this.isActived;
        }
      },
      immediate: true,
    },
  },
  methods: {
    getCurrentTime() {
      setInterval(() => {
        console.log("每秒获取一次当前时间");
        this.currentTime = this.$dayjs(new Date()).format(
          "YYYY年-MM月-DD日 HH时:mm分:ss秒"
        );
        console.log(this.currentTime);
      }, 1000);
    },
    addSex() {
      //this.$set();只能给data里的某个对象添加属性不能直接给data追加属性
      //Vue.set( target, propertyName/index, value )=this.$set()
      //向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')
      this.$set(this.student, "sex", "男");
    },
    deleteSex() {
      this.$delete(this.student, "sex");
    },
  },
  created() {},
  mounted() {
    this.getCurrentTime();
    //js获取时间戳
    console.log(new Date().getTime(), Date.now());
    var now = this.$moment().format("YYYY-MM-DD HH:mm:ss");
    console.log("momentjs:" + now);
    var now2 = this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    console.log("momentjs:" + now2);

    var dayjsNow = this.$dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log("dayjs:" + dayjsNow);

    var dayjsNow2 = this.$dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss");
    console.log("dayjs:" + dayjsNow2);
    // 可以看出用的时间差别还是很大的，+new Date() 用的时间最多，因为它涉及到类型转换，转换成数字，所以花的时间最多
    // Date.now() 用的时间最少，它与其它获取时间戳最大的区别就是，一个是 constructor 的 属性，其它是 constructor.prptotype 的属性，实例化的区别，显然实例化对象花的时间更多
  },
  beforeDestroy() {
    var _this = this;
    if (_this.timer) {
      _this.clearInterval(_this.timer);
    }
  },
};
</script>
<style lang="scss" scoped>
.current-time {
  color: #333;
  font-size: 25px;
}
.active {
  color: deepskyblue;
  transition: 0.8s linear;
  opacity: 1;
}
</style>
