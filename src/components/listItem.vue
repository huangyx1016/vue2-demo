<template>
	<!-- 树形菜单   递归组件  -->
	<div class="container">
		<li>
			<!-- 点击折叠展开 -->
			<div @click="toggle">
				<!-- 显示内容 -->
				{{ model.title }}
				<!-- 显示折叠展开的图标，如果没有下级目录的话，则不显示 -->
				<span v-if="isFolder" class="operate-btn">[{{ open ? '-' : '+' }}]</span>
			</div>
			<!-- 控制是否显示下级目录 -->
			<!-- v-if和v-show可以同时使用 v-if和v-for不能同时使用 -->
			<ul v-show="open" v-if="isFolder">
				<!-- 重点代码，调用自身，实现递归，绑定数据  递归组件在组件里自己调用自己 -->
				<listItem v-for="model in model.children" :model="model" :key="model.title"></listItem>
			</ul>
		</li>
	</div>
</template>

<script>
export default {
	name: 'listItem',
	props: {
		model: {
			type: Object, //类型
			required: true, //是否必须
		}, //子组件获取的来自父组件传入的树形数据
	},
	components: {},
	data() {
		return {
			// 默认不显示下级目录
			open: false,
		};
	},
	methods: {
		// 点击折叠或展开的方法
		toggle() {
			//如果有子节点数据
			if (this.isFolder) {
				this.open = !this.open; //取反
			}
		},
	},
	mounted() {
		//页面加载完成
	},
	created() {},
	watch: {},
	computed: {
		// 控制是否有下级目录和显示下级目录
		isFolder() {
			return this.model.children && this.model.children.length;
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	.operate-btn {
		cursor: pointer; //显示鼠标小手
	}
}
</style>
