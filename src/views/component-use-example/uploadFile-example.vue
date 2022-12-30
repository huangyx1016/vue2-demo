<template>
	<!-- 文件上传 -->
	<div>
		<el-button type="success" @click="filedialogVisible = true" icon="el-icon-upload2">上传文件</el-button>

		<!-- 上传文件模态框 Start -->
		<el-dialog title="上传行政文件" :visible.sync="filedialogVisible" width="600px" :before-close="filehandClose">
			<el-upload
				ref="upload"
				style="text-align: center"
				action="url"
				drag
				:http-request="uploadFile"
				multiple
				accept=".pdf"
				:limit="1"
				:auto-upload="false"
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">
					将文件拖到此处,或
					<em>点击上传</em>
				</div>
				<div class="el-upload__tip" slot="tip">只允许上传PDF文件,大小不超过100MB</div>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitFile">上传</el-button>
				<el-button @click="filedialogVisible = false">取 消</el-button>
			</div>
		</el-dialog>
		<!-- 上传文件模态框 End -->
	</div>
</template>

<script>
export default {
	name: '',
	props: {},
	components: {},
	data() {
		return {
			filedialogVisible: false,
		};
	},
	methods: {
		//
		filehandClose() {
			//按需在data中定义
			this.filedialogVisible = false;
		},

		// 用户自定义上传文件 Start
		uploadFile(param) {
			const formData = new FormData();
			formData.append('file', param.file);
			this.$axios
				.post('/govermentfile/upload', formData, {
					'Content-type': 'multipart/form-data',
				})
				.then(res => {
					console.log(res.data);
					this.filedialogVisible = false;
					this.$message({
						showClose: true,
						duration: 2000,
						message: '上传成功',
						type: 'success',
						onClose: () => {
							this.getFileList();
						},
					});
				});
		},
		submitFile() {
			this.$refs.upload.submit();
		},
	},
	mounted() {},
	created() {},
	watch: {},
	computed: {},
};
</script>

<style lang="scss" scoped></style>
