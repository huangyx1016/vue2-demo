<template>
	<!-- 分页组件的基本使用 pagination-->
	<div>
		<Pagination
			:layout="layout"
			:total="total"
			:size="size"
			:singleHide="singleHide"
			@change="changePage"
			@changeSize="changePageSize"
		/>
	</div>
</template>

<script>
import Pagination from '@/components/pagination.vue';
export default {
	name: 'pagination-example',
	components: {
		Pagination,
	},
	data() {
		return {
			// 分页要显示的内容：总条数、每页条数、上一页、页数、下一页、页面跳转
			layout: 'total, sizes, prev, pager, next, jumper',
			total: 100, // 总条数
			size: 20, // 每页条数
			singleHide: false, // 当只有一页的时候是否隐藏分页组件
		};
	},
	methods: {
		// 切换页面时触发
		changePage(e) {
			//这里的e是当前页码
			console.log(e);
		},
		// 切换每页展示的条数时触发
		changePageSize(e) {
			//这里的e是当前的每页条数
			console.log(e);
		},
	},
};
</script>

<style lang="scss" scoped></style>
