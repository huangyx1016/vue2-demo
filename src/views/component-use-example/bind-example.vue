<template>
	<div class="container">
		<!-- vue 自定义指令 v-focus -->
		<input type="text" v-foucs />
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
	//自定义指令
	directives: {
		//该指令主要实现input聚焦的功能
		focus: {
			// 指令的定义
			//inserted 当被绑定的元素插入到 DOM 中时……
			inserted: function (el) {
				console.log('当被绑定的元素插入到 DOM 中时……');
				console.log(el);
				el.focus();
			},
		},
	},
	methods: {},
	mounted() {},
	created() {},
	watch: {},
	computed: {},
};
</script>

<style lang="scss" scoped></style>
