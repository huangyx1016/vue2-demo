<template>
	<!-- 分页组件 -->
	<div class="pagination">
		<el-pagination
			@current-change="handleCurrentChange"
			@size-change="handleSizeChange"
			:current-page="currentPage"
			:page-size="size"
			background
			:layout="layout"
			:total="total"
			:hide-on-single-page="singleHide"
		></el-pagination>
	</div>
</template>

<script>
export default {
	name: 'Paginations',
	props: {
		//总条数 total
		total: {
			type: Number,
			default: 0,
		},
		//每页条数
		size: {
			type: Number,
			default: 10,
		},
		// 分页组件要显示的内容
		layout: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper',
		},
		// 当只有一页的时候是否隐藏分页组件  默认隐藏
		singleHide: {
			type: Boolean,
			default: true,
		},
		//当前页码
		currentPage: {
			type: Number,
			default: 1,
		},
	},
	methods: {
		//当前页改变时触发
		handleCurrentChange(val) {
			this.$emit('change', val); //子组件向父组件传递
		},
		//每页条数改变时触发
		handleSizeChange(val) {
			this.$emit('changeSize', val);
		},
	},
};
</script>

<style scoped lang="scss">
.pagination {
	display: inline-block;
}
</style>
