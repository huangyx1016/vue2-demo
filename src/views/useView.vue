<template>
	<div class="container">
		<!-- vue 自定义指令 v-focus -->
		<input type="text" v-focus v-model="form.user" placeholder="请输入用户名" />
		<!-- <input type="text" v-focus2 v-model="form.password" placeholder="请输入密码" /> -->
		<!-- 下拉菜单 自定义指令 v-menu -->
		<div class="main" v-menu="handleHide">
			<button @click="show = !show">点击显示下拉菜单</button>
			<div class="dropdown" v-show="show">
				<div class="item"><a href="#">选项 1</a></div>
				<div class="item"><a href="#">选项 2</a></div>
				<div class="item"><a href="#">选项 3</a></div>
			</div>
		</div>
		<el-button type="primary" @click="goBack">点击返回上一级页面</el-button>
	</div>
</template>

<script>
export default {
	name: '',
	props: {},
	components: {},
	//vue 自定义指令的使用 v-xx 对dom元素进行底层操作
	//使用的场景 当需要对普通 DOM 元素进行底层操作，此时就会用到自定义指令
	//例如 输入框自动聚焦 下拉菜单点击空白时  拖拽等
	directives: {
		//该指令主要实现页面加载完毕后input聚焦的功能
		focus: {
			//inserted 当被绑定的元素插入到 DOM 中时……
			inserted: function (el, binding, vnode, oldVnode) {
				console.log('当被绑定的元素插入到 DOM 中时……');
				console.log(el); //指令所绑定的元素 可以用来直接操作DOM
				console.log(binding); //一个对象 {name:""(指令名,不包含v-前缀),vale:""(指令的绑定值),oldValue:""(指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。),expression:""(字符串形式的指令表达式),arg:""(传给指令的参数),modifiers:""(一个包含修饰符的对象)}
				console.log(vnode); //虚拟节点
				console.log(oldVnode); //上一个虚拟节点
				el.focus(); //聚焦
			},
		},
		//点击下拉菜单以外的区域隐藏菜单 v-menu 自定义指令
		menu: {
			// bind() 指令与元素成功绑定时（一上来）  指令第一次被绑定到元素时才调用,只调用一次
			bind(element, binding) {
				console.log(element);
				console.log(binding);
				element.value = binding.value;
			},
			// 被绑定元素插入父节点时
			inserted(element, binding) {
				console.log(element);
				console.log(binding);
				element.focus();
			},
			// 指令所在的模板重新被解析  每次DOM更新时被调用
			update(element, binding) {
				console.log(element);
				console.log(binding);
				element.value = binding.value;
			},
		},
	},
	data() {
		return {
			//表单form
			form: {
				user: '', //输入框input
				password: '', //输入框input 密码
			},
			show: false, //下拉菜单显示/隐藏
		};
	},
	methods: {
		handleHide() {
			this.show = false;
		},
		//返回上一级
		goBack() {
			//go(-1): 原页面表单中的内容会丢失；
			this.$router.go(-1); //后退+刷新；
			// this.$router.go(0); //刷新；
			// this.$router.go(1); //前进

			// //back();// 原页表表单中的内容会保留；
			//this.$router.back(); //后退 ；
			// this.$router.back(0); // 刷新；
			// this.$router.back(1); //前进

			//replace()
			//this.$router.replace("/home"); //replace() 替换路由
		},
	},
	mounted() {
		console.log('mounted');
		let obj = { id: 1, name: 'zhangsan', age: 18 };
		console.log(Object.getOwnPropertyNames(obj)); // ['id','name',age:''] 返回的是对象中所有自己的属性 以数组的形式返回
		console.log(Object.keys(obj)); //['id','name',age:'']  Object.keys(obj)返回的对象中所有自己的属性，也就是属性下的 enumerable: true 的属性
		//forEach循环
		Object.getOwnPropertyNames(obj).forEach(function (val, idx, array) {
			console.log(val); //id,name,age 对象的属性名
			console.log(idx); //下标 0,1,2
			console.log(array); // ['id','name',age:'']
			console.log(obj[val]); //对应的属性值

			//uniapp的生命周期
			/**
			 * 1、应用生命周期 APP.vue文件里
			 * 2、页面生命周期 onInit(监听页面初始化、触发略早于onLoad)、onLoad(监听页面加载)、onShow(监听页面显示,页面每次出现在屏幕上都触发)、onReady(监听页面初次渲染完成)
			 * onHide(监听页面隐藏)、onUnload(监听页面卸载)、onResize(监听窗口尺寸变化)、onPullDownRefresh(监听用户下拉动作,一般用于下拉刷新)、onReachBottom(页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据)
			 *onTabItemTap(点击tab时触发)、onShareAppMessage(用户点击右上角的分享按钮)、
			 * 3、组件的生命周期 vue的生命周期
			 */
		});
	},
	created() {},
	watch: {},
	computed: {},
};
</script>

<style lang="scss" scoped></style>
