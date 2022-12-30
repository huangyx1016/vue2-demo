<template>
	<!-- navTitle 子组件   插槽有三种 匿名插槽(默认插槽)/具名插槽/作用域插槽 -->
	<div class="nav-box">
		<!-- 具名插槽 -->
		<slot name="left"></slot>
		<!-- 默认插槽 -->
		<slot></slot>
		<!-- 具名插槽 -->
		<slot name="right"></slot>
	</div>
</template>

<script>
export default {
	name: '',
	props: {},
	components: {},
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
.nav-box {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	margin: 0;
	padding: 0;
	padding: 0 10px;
}
</style>
