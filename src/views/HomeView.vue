<template>
  <!-- vue简单购物车实例  computed计算属性的使用 计算总价sum-->
  <div>
    <!-- <search />
		<pageination />
		<tab /> -->
    <bindExample />
    <el-button type="primary" @click="toNextPage">点击跳转下一个页面</el-button>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <navTitleExample />

    <el-button type="primary" @click="toUsePageHandle"
      >点击调用.js文件里的方法进行路由跳转</el-button
    >
    <!-- <div>
			<table id="mytable">
				<thead>
					<tr style="background: Gainsboro">
						<th></th>
						<th>商品名称</th>
						<th>商品单价</th>
						<th>商品数量</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in goods" :key="index" :class="{ on: index % 2 !== 0, off: index % 2 == 0 }">
						<td>{{ item.id }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.price }}</td>
						<td>
							<button @click="reduce(index)">-</button>
							&nbsp;{{ item.count }}&nbsp;
							<button @click="add(index)">+</button>
						</td>
						<td>
							<button @click="del(index)">移除</button>
						</td>
					</tr>
				</tbody>
			</table>
			<p>总价：￥ {{ sum }}</p>
			<el-button type="primary" @click="changHighLight">{{ buttonText }}</el-button>
			<div :class="[isActive ? 'activeClass' : '']">message</div>
			<p :style="{ fontSize: fontSize + 'px' }">信息信息信息</p>
			<div class="bg"></div>
			<img src="@/assets/logo.png" style="width: 100px; height: 100px" alt="" />
			<img :src="logoImg" style="width: 100px; height: 100px" alt="" />
		</div> -->

    <!-- flex弹性布局 -->
    <!-- <div class="box">
			<div class="inner"></div>
			<div class="inner1"></div>
		</div> -->
    <!-- <el-button type="primary" @click="changHighLight">{{ buttonText }}</el-button>
		<div :class="[isActive ? 'activeClass' : '']">message</div>
		<p :style="{ fontSize: fontSize + 'px' }">信息信息信息</p> -->
  </div>
</template>

<script>
//es6导入 import
import exportData from "./exportUse.js";
import { testFn, testFn2, toUsePage, showMessage } from "./exportFnUse.js";
import search from "./component-use-example/search.vue";
import pageination from "./component-use-example/pagination-example.vue";
import tab from "./component-use-example/tab-example.vue";
import bindExample from "./component-use-example/bind-example.vue";
import navTitleExample from "./component-use-example/navTitle-example.vue";

export default {
  name: "",
  props: {},
  components: { search, pageination, tab, bindExample, navTitleExample },
  data() {
    return {
      logoImg: require("@/assets/logo.png"),
      goods: [
        {
          id: 1,
          name: "IPhone X",
          price: 7999,
          count: 5,
        },
        { id: 2, name: "荣耀16", price: 2399, count: 2 },
        { id: 3, name: "华为P22", price: 3399, count: 3 },
        { id: 4, name: "小米9", price: 3999, count: 4 },
      ],
      isActive: false,
      fontSize: 12,
      buttonText: "点击高亮",
      count: 0, //数量
      form: {
        name: "",
        region: "",
        desc: "",
      },
    };
  },
  methods: {
    toNextPage() {
      //跳转页面
      this.$router.push({ path: "/use" });
    },
    //点击减少数量的按钮
    reduce(index) {
      console.log(index);
      console.log(this.goods[index].count);
      if (this.goods[index].count == 1) {
        this.goods[index].count = 1; //库存为1的时候不能再往下减
      } else {
        this.goods[index].count--; //库存递减
      }
    },
    add(index) {
      //提示每人限购10件
      if (this.goods[index].count > 10) {
        alert("每个账号限购10件");
        return;
      }
      this.goods[index].count++; //数量递增
    },
    //删除购物车单项
    del(index) {
      this.goods.splice(index, 1); //删除购物车
    },
    //点击按钮切换高亮效果
    changHighLight() {
      this.isActive = !this.isActive; //取反
      //使用三目表达式来设置buttonText
      this.isActive ? (this.fontSize = 18) : (this.fontSize = 12);
      this.isActive
        ? (this.buttonText = "取消高亮")
        : (this.buttonText = "点击高亮");
    },
    //js的一些常用函数
    jsArrAndStringFnTest() {
      //常用的一些js数组和字符串方法
      //js filter函数用来过滤价格高于3000的商品
      let higherGoods = this.goods.filter((item) => item.price > 3000);

      //js find函数找出符合条件的第一个元素 找的到的话返回第一个符合条件的元素，找不到的话就返回undefined
      let applePhone = this.goods.find((item) => item.name === "IPhone X");

      //js sort方法 对数组根据条件进行排序 升序或降序
      let sortArr = this.goods.sort((a, b) => a.price - b.price); //从小到大

      //js map方法 返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。
      let mapArr = this.goods.map((item) => item.price); //这里是返回所有的价格  map方法可以获取数组中的单个属性
      console.log(higherGoods);
      console.log(applePhone);
      console.log(sortArr);
      console.log(mapArr);

      //js join方法用于把数组中所有元素转换为一个字符串
      let joinMapArr = mapArr.join(","); //这里是将数组中的所有元素变成用逗号拼接成的字符串
      console.log(joinMapArr);

      //js split方法将字符串根据逗号分割成数组
      let splitMapArr = joinMapArr.split(",");
      console.log(splitMapArr);

      //js reverse方法 数组顺序点到
      let reverseSplitMapArr = splitMapArr.reverse();
      console.log(reverseSplitMapArr);

      //js pop方法 删除并返回数组的最后一个元素
      // let popReverseSplitMapArr = reverseSplitMapArr.pop();
      // console.log(popReverseSplitMapArr);
      // console.log(reverseSplitMapArr);

      //js shift方法删除并返回数组的第一个元素
      // let shiftReverseSplitMapArr = reverseSplitMapArr.shift();
      // console.log(shiftReverseSplitMapArr);

      //js unshift方法 在数组头部添加一个元素并返回新的长度
      // let unshiftReverseSplitMapArr = reverseSplitMapArr.unshift('1000');
      // console.log(unshiftReverseSplitMapArr);
      // console.log(reverseSplitMapArr);

      //js slice方法 数组截取从start到end  end不包含 如果知道start不指定end的话会从开始截取到数组结束 start可以为负数表示从数组的倒数第几个元素开始截取
      let sliceReverseSplitMapArr = reverseSplitMapArr.slice(0, 2);
      console.log(sliceReverseSplitMapArr);

      //js every 数组每个元素是否都满足 some 数组每个元素是否有符合条件
      console.log(this.goods.every((item) => item.price > 1000)); //返回boolean值

      console.log(this.goods.some((item) => item.price > 8000)); //返回boolean值

      //forEach循环数组
      this.goods.forEach((item, index) => {
        console.log(item);
        console.log(index);
      });

      let obj = {
        name: "zhangsan",
        age: 18,
        city: "厦门",
      };
      // js for in 遍历对象
      for (let i in obj) {
        console.log(i); //key (name,age,city)
        console.log(obj[i]); //value (zhangsan,18,厦门)
      }

      //js 截取字符串的方法
      let str = "Hello World";
      //js substring(start,end)方法提取字符串中介于两个指定下标之间的字符。
      //包含开始处得字符不包括结束处的字符 (0,7)相当于[0,7)
      console.log(str.substring(0, 7)); //Hello  W
      //js substr(index,howmany) 方法可在字符串中抽取从 开始 下标开始的指定数目的字符。
      console.log(str.substr(0, 3)); //Hwl
    },
    //点击表单提交
    onSubmit() {
      console.log("提交");
    },
    //点击跳转use路由页面
    toUsePageHandle() {
      toUsePage(); //这里调用了.js文件里的export导出的function 实现路由的跳转
      showMessage();
    },
  },
  mounted() {
    console.log("params", this.$route.params.id);
    this.jsArrAndStringFnTest();
    //export import es6规范
    console.log(exportData); //es6的导出导出  export import
    testFn(); //es6的导出方法  export function
    testFn2();
    //module.exports=   这是commonjs规范 需要使用require引入
    let list = require("./moduleExportUse.js");
    console.log(list);
    // this.$store.dispatch(); //vuex用来触发异步的方法 actions里的异步方法 this.$store.dispatch("",参数);
    // this.$store.commit(); //vuex用来触发同步的方法 mutations里的方法 this.$store.commit("",参数);
  },
  //watch属性是不带缓存的 监听属性里面主要写些异步操作
  watch: {
    buttonText: {
      //参数 新值,旧值
      handler(newVal, oldVal) {
        console.log("new：" + newVal, "old：" + oldVal);
      },
      immediate: true, //监听立即执行
    },
  },
  computed: {
    //计算属性是带缓存的
    //计算属性计算购物车的商品总价格
    sum() {
      var sum = 0;
      for (var i = 0; i < this.goods.length; i++) {
        sum += this.goods[i].price * this.goods[i].count; //总价格=商品单价*商品的数量
      }
      return sum;
    },
    count: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    //计算属性改变button的文字的值
    text() {
      let messageText = "点击高亮";
      this.isActive ? (messageText = "取消高亮") : "点击高亮";
      console.log(messageText);
      return messageText;
    },
  },
  filters: {},
};
</script>

<style lang="scss" scoped>
// table {
// 	border: 1px solid gray;
// 	width: 600px;
// 	border-collapse: collapse;
// }
// tr {
// 	height: 35px;
// 	text-align: center;
// }
// .on {
// 	background: #f5f5f5;
// }
// .off {
// 	background: white;
// }
// .activeClass {
// 	//文字颜色
// 	color: dodgerblue;
// }
// .errorClass {
// 	color: red;
// }
// .bg {
// 	width: 100px;
// 	height: 100px;
// 	//在style样式中vue的background-image的路径可以写成 ~@/assets/logo.png   ~@表示从src的目录开始往下找
// 	background-image: url(~@/assets/logo.png);
// 	background-size: cover;
// 	background-repeat: no-repeat;
// }
// .box {
// 	display: flex;
// 	flex-direction: row;
// 	margin: 100px auto;
// 	width: 400px;
// 	height: 200px;
// 	border: 1px solid red;
// }
// .inner {
// 	flex-basis: 200px; //
// 	height: 100px;
// 	background: black;
// 	flex-shrink: 0; //默认值为1  收缩  flex-grow:默认值0 flex:basis:元素所占宽度   flex:1 = flex:0 1 auto; (顺序)flex-grow,flex-shrink,flex-basis
// }
// .inner1 {
// 	flex-basis: 300px; //flex-basis 如果同时设置了flex-basis和width 会取的是flex-basis的值
// 	height: 100px;
// 	background: blue;
// 	flex-shrink: 0;
// }
</style>
