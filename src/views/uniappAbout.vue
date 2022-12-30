<template>
	<div class="container">
		<el-button type="primary">点击</el-button>
		<!-- 弹性布局一行4个div间距相同 -->
		<div class="list-box">
			<div class="list-box-items" v-for="(item, index) in 12" :key="index"></div>
		</div>
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
	methods: {
		uniappTest() {
			//uniapp页面的几种跳转页面方式
			uni.navigateTo(Object); //保留当前页面，跳转到应用内的某个页面
			uni.redirectTo(OBJECT); //关闭当前页面，跳转到应用内的某个页面。
			uni.reLaunch(OBJECT); //关闭所有页面，打开到应用内的某个页面。
			uni.switchTab(OBJECT); //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
			uni.navigateBack(OBJECT); //关闭当前页面，返回上一页面或多级页面。

			//uniapp的消息提醒
			//显示消息提示框
			uni.showToast({ title: '', duration: 2000 });
			uni.hideToast(); //隐藏消息提示框
			uni.showLoading({
				title: '加载中',
			}); //显示 loading 提示框,
			uni.hideLoading(); //隐藏loading提示框

			//uniapp模态框
			uni.showModal({
				title: '提示',
				content: '这是一个模态弹窗',
				success: function (res) {
					if (res.confirm) {
						console.log('用户点击确定');
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				},
			});

			//uniapp从底部向上弹出操作菜单
			uni.showActionSheet({
				itemList: ['A', 'B', 'C'],
				success: function (res) {
					console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				},
				fail: function (res) {
					console.log(res.errMsg);
				},
			});

			//uniapp的请求方式 uni.request({});
			uni.request({
				url: 'http://192.168.30.24:8080/wssb/municipalpublic/waterelec/mobile/area', //仅为示例，并非真实接口地址。
				header: {
					'content-type': 'application/json;charset=UTF-8',
				},
				method: 'POST', //默认请求方式是GET
				// data:{},
				success: res => {
					console.log(res);
					console.log(res.data.data);
					if (res.data.success) {
						this.areaList = res.data.data;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						});
					}
				},
			});

			//uniapp的文件上传API
			//uni.uploadFile({});
			const tempFilePaths = chooseImageRes.tempFilePaths;
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: 'https://www.example.com/upload', //服务器接口地址
						filePath: tempFilePaths[0], //要上传文件资源的路径  files和filePath取其一
						name: 'file', //文件对应的 key
						formData: {
							user: 'test',
						}, //HTTP 请求中其他额外的 form data
						//文件上传接口调用成功的回调
						success: uploadFileRes => {
							console.log(uploadFileRes.data);
						},
					});
				},
			});

			//页面生命周期onReachBottom(){};页面生命周期下拉触底 用来做滑动分页效果
			//需要搭配 uni-load-more组件 实现下拉滑动分页功能
			//onPullDownRefresh() 监听页面用户下拉刷新事件
			//uni.stopPullDownRefresh() 停止当前页面下拉刷新的方法
		},
	},
	mounted() {
		//uniapp常用的生命周期
		//------------应用生命周期-------------
		//onLaunch 当uniapp初始化完成时启动一次 (全局只触发一次)
		//onShow 当 uni-app 启动，或从后台进入前台显示 ，多次触发
		//onHide 当 uni-app 从前台进入后台 ，多次触发
		//onError 当 uni-app 报错时触发
		//------------页面生命周期-------------
		//onLoad	监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		//onShow 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面，多次加载
		//onReady 监听页面初次渲染完成。
		//onHide 监听页面隐藏，多次加载
		//onUnload 监听页面卸载
		//------------组件生命周期(vue的生命周期)-------------
	},
	created() {},
	watch: {},
	computed: {},
};
</script>

<style lang="scss" scoped>
.container {
	.list-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		.list-box-items {
			flex: 0 0 24%;
			height: 100px;
			background-color: skyblue;
			margin-right: calc(4% / 3);
			margin-bottom: calc(4% / 3);
		}
		/* 去除每行尾的多余边距 */
		.list-box-items:nth-child(4n) {
			margin-right: 0;
		}
		/* 使最后一个元素的边距填满剩余空间 */
		.list-box-items:last-child {
			margin-right: auto;
		}
	}
}
</style>
