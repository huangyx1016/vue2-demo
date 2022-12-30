<template>
	<!-- 搜索框组件 -->
	<div class="search" ref="searchRef" @click="handlerClick">
		<el-input
			type="text"
			:placeholder="placeholder"
			:prefix-icon="loading ? 'el-icon-loading' : 'el-icon-search'"
			:clearable="clearable"
			v-model="content"
			@keyup.enter.native="$emit('search')"
			@input="inputHandle"
			ref="searchDom"
			:disabled="disabled ? loading : disabled"
		></el-input>
	</div>
</template>

<script>
export default {
	name: 'Search',
	model: {
		prop: 'searchValue',
		event: 'change',
	},
	props: {
		searchValue: String,
		// 搜索加载中
		loading: {
			type: Boolean,
			default: false,
		},
		// 搜索框提示内容
		placeholder: String,
		// 搜索框样式
		searchStyle: Object,
		// 是否禁用搜索框、或者只禁用搜索图标
		disabled: {
			type: Boolean,
			default: true,
		},
		// 是否可清空
		clearable: {
			type: Boolean,
			default: true,
		},
		//是否防抖,防抖时间,传0表示不防抖
		delay: {
			type: Number,
			default: 500,
		},
	},
	data() {
		return {
			content: '', // 搜索框内容,
			timer: null,
		};
	},
	watch: {
		// 监听搜索框值
		searchValue: {
			immediate: true,
			handler(val) {
				this.content = val;
			},
		},
		// 搜索框样式
		searchStyle: {
			immediate: true,
			deep: true,
			handler(val) {
				// eslint-disable-next-line @typescript-eslint/no-this-alias
				let _that = this;
				for (var prop in val) {
					(function (prop, value) {
						if (typeof value === 'number') {
							_that.$nextTick(() => {
								_that.$refs.searchDom.$refs.input.style[prop] = value + 'px';
							});
						} else if (typeof value === 'string') {
							_that.$nextTick(() => {
								_that.$refs.searchDom.$refs.input.style[prop] = value;
							});
						}
					})(prop, val[prop]);
				}
			},
		},
	},
	methods: {
		inputHandle() {
			this.$emit('change', this.content);
			if (this.delay) {
				this.debounce(this.handleChange, this.delay);
			} else {
				this.handleChange();
			}
		},
		handleChange() {
			this.$emit('changeInput', this.content);
		},
		//防抖
		debounce(fn, delay) {
			if (this.timer) clearTimeout(this.timer);
			this.timer = setTimeout(fn, delay);
		},
		// 点击搜索图标
		handlerClick(e) {
			let event = window.event || e;
			let target = event.srcElement || event.target;
			let targetClass = target.getAttribute('class');
			if (!this.disabled) {
				target.setAttribute('disable', true);
			}
			if (targetClass === 'el-input__icon el-icon-search') {
				this.$emit('search');
			}
		},
	},
};
</script>
<style scoped lang="scss">
.search {
	display: inline-block;
	width: 100%;
	::v-deep.el-input {
		.el-input__prefix {
			.el-input__icon.el-icon-search {
				cursor: pointer;
			}
		}
	}
}
</style>
