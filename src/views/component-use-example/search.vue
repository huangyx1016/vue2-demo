<template>
	<div class="container">
		<!-- 搜索组件Search.vue的使用 -->
		<div class="search-box">
			<Search
				:searchStyle="{ width: '300px' }"
				:placeholder="'请输入关键词'"
				:loading="searchLoading"
				:disabled="isDisabled"
				@search="searchHandle"
				v-model="searchValue"
			/>
		</div>
		<!-- <el-button type="primary" icon="el-icon-edit" circle></el-button>
		<el-button type="primary">主要按钮</el-button>
		<el-button type="danger" plain>危险按钮</el-button>
		<el-button type="primary" plain>主要按钮</el-button>
		<el-button>默认按钮</el-button>
		<el-button plain>朴素按钮</el-button> -->
	</div>
</template>

<script>
import Search from '@/components/Search.vue';
export default {
	name: 'example',
	components: {
		Search,
	},
	data() {
		return {
			searchValue: '', // 搜索框内容
			searchLoading: false, // 搜索加载中
			isDisabled: false, // 加载中是否禁用整个搜索框 || 只禁用搜索图标
		};
	},
	methods: {
		searchHandle() {
			this.searchLoading = !this.searchLoading;
			console.log(this.searchValue);
			setTimeout(() => {
				this.searchLoading = false;
				this.searchValue = ''; // 清空内容
			}, 3000);
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	.search-box {
		height: 40px;
	}
}
</style>
