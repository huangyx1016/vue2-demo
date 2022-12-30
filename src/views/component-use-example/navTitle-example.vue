<template>
	<div class="container">
		<!-- 父组件中使用插槽的基本 -->
		<div class="nav-title-box">
			<navTitle>
				<!-- 具名插槽 v-slot:left/#left(简写) 具名插槽的两种写法 -->
				<template v-slot:left>
					<!-- 这是左侧部分插槽 -->
					<div class="left-icon"></div>
				</template>
				<!-- 匿名插槽 这是中间的标题插槽 -->
				<template>
					<div class="title">标题名称</div>
				</template>
				<!-- 具名插槽 #right #+插槽的名称 -->
				<template #right>
					<!-- 这是右侧插槽的部分 -->
					<div style="width: 30px; height: 30px; border-radius: 50%; border: 1px solid blue; flex: 1"></div>
				</template>
				<!-- 还有一种作用域插槽 -->
			</navTitle>
		</div>
	</div>
</template>

<script>
import navTitle from '@/components/navTitle.vue';
export default {
	name: '',
	props: {},
	components: { navTitle },
	data() {
		return {};
	},
	methods: {},
	mounted() {},
	created() {},
	watch: {},
	computed: {},
};
</script>

<style lang="scss" scoped>
.container {
	.left-icon {
		width: 10px;
		height: 30px;
		background-color: deepskyblue;
		flex: 30%;
	}
	.nav-title-box {
		width: 200px;
		height: 40px;
		border: 1px solid black;
	}
	.title {
		font-size: 18px;
		font-weight: 400;
		flex: 0 0 40%;
	}
}
</style>
