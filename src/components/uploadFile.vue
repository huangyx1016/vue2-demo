<template>
	<!-- 文件上传组件 -->
	<div class="upload-file-container">
		<el-form class="upload-form" ref="downForm" :model="formData" :rules="rulesForm">
			<el-form-item label="文件格式" prop="downFileType">
				<el-select v-model="formData.downFileType" placeholder="请选择文件格式" @change="selectChange">
					<el-option v-for="item in downFileTypes" :key="item" :label="item" :value="item"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<!-- elementui 拖拽文件上传组件 -->
		<!-- auto-upload 是否在选取文件后立即进行上传  limit:最大允许上传个数-->
		<el-upload
			class="upload-demo"
			drag
			action=""
			:file-list="fileList"
			:auto-upload="false"
			:limit="1"
			:accept="`.txt,.json,.xml,.xlsx`"
			:on-change="submitFile"
			:on-remove="removeFile"
		>
			<i class="el-icon-upload"></i>
			<div class="el-upload__text">
				将文件拖到此处，或
				<em>点击上传</em>
			</div>
			<div class="el-upload__tip" slot="tip">只能上传txt、json、xml、xlsx文件</div>
		</el-upload>
		<div class="upload-button">
			<el-button type="primary" @click="importFileUpload" :disabled="!this.uploadFileList" :loading="uploadLoading">
				上传
			</el-button>
			<el-button type="primary" @click="downFileHandler('downForm')">下载模板</el-button>
		</div>
	</div>
</template>

<script>
import {
	downloadSupportTaskTemplate, // 保障任务下载模板
	downloadWarTaskTemplate, // 作战任务下载模板
	importFile, // 导入作战任务
	importSupTask, // 导入保障任务
} from '@/services/api-ccirs.js';
// import axios from "axios";
export default {
	name: 'UploadFile',
	props: {
		modelType: {
			type: String,
			default: 'bzrw',
		},
	},
	data() {
		return {
			// 表单数据
			formData: {
				downFileType: 'txt', // 选择下载的文件类型
			},
			// 表单校验规则
			rulesForm: {
				downFileType: [{ required: true, message: '请选择文件格式', trigger: 'blur' }],
			},
			fileList: [], // 待上传的文件列表
			uploadFileList: null,
			// 可选择文件类型
			downFileTypes: ['txt', 'json', 'xml', 'xlsx'],
			uploadLoading: false, // 上传加载动画
		};
	},
	methods: {
		selectChange() {
			this.fileList = [];
			this.removeFile();
		},
		// 文件上传错误处理
		submitFile(file) {
			this.uploadFileList = file.raw;
			let type = this.getFileType(this.uploadFileList);
			if ((type == 'txt' || type == 'json' || type == 'xml' || type == 'xlsx') && this.formData.downFileType != type)
				this.formData.downFileType = type;
		},
		// 移除预览文件
		removeFile() {
			this.uploadFileList = null;
			this.fileList = [];
		},
		// 下载模板
		downFileHandler(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					if (this.modelType == 'bzrw') {
						this.downloadSupportTaskTemplate('bzrw', this.formData.downFileType);
					} else if (this.modelType == 'zzrw') {
						this.downloadWarTaskTemplate('zzrw', this.formData.downFileType);
					}
				}
			});
		},

		// 上传
		importFileUpload() {
			if (this.modelType == 'zzrw') {
				this.importFile(this.uploadFileList);
			} else if (this.modelType == 'bzrw') {
				this.importSupTask(this.uploadFileList);
			}
		},
		//获取打开文件名的后缀名
		getFileType(file) {
			var filename = file.name;
			var arr = filename.split('.');
			var type = arr[arr.length - 1];
			return type;
		},
		// bzrw下载模板
		async downloadSupportTaskTemplate(type, fileType) {
			let resp = await downloadSupportTaskTemplate(type, fileType).catch(err => {
				console.log(err);
			});
			if (resp.data) {
				let filename = resp.headers['content-disposition'].split(';')[1];
				filename = filename.split('=')[1];
				if (filename) {
					filename = decodeURIComponent(filename);
				}
				let blobData = '';
				if (fileType === 'json') {
					blobData = JSON.stringify(resp.data);
				} else {
					blobData = resp.data;
				}
				let blob = '';
				if (fileType === 'xlsx') {
					blob = new Blob([blobData], {
						type: `application/vnd.ms-excel,charset=UTF-8`,
					});
				} else {
					blob = new Blob([blobData], {
						type: `application/${fileType},charset=UTF-8`,
					});
				}
				var url = window.URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				a.download = filename || `保障任务.${fileType}`;
				a.click();
			} else {
				this.$message.error('模板下载失败');
			}
		},
		// zzrw下载模板
		async downloadWarTaskTemplate(type, fileType) {
			let resp = await downloadWarTaskTemplate(type, fileType).catch(err => {
				console.log(err);
			});
			if (resp.data) {
				let filename = resp.headers['content-disposition'].split(';')[1];
				filename = filename.split('=')[1];
				if (filename) {
					filename = decodeURIComponent(filename);
				}
				let blobData = '';
				if (fileType === 'json') {
					blobData = JSON.stringify(resp.data);
				} else {
					blobData = resp.data;
				}
				let blob = '';
				if (fileType === 'xlsx') {
					blob = new Blob([blobData], {
						type: `application/vnd.ms-excel,charset=UTF-8`,
					});
				} else {
					blob = new Blob([blobData], {
						type: `application/${fileType},charset=UTF-8`,
					});
				}
				var url = window.URL.createObjectURL(blob);
				var a = document.createElement('a');
				a.href = url;
				a.download = filename || `作战任务.${fileType}`;
				a.click();
			} else {
				this.$message.error('模板下载失败');
			}
		},

		// 导入作战任务
		async importFile(file) {
			this.uploadLoading = true;
			let resp = await importFile(file).catch(err => {
				console.log(err);
				if (err.data.msg) {
					this.$message.error(err.data.msg);
				} else {
					this.$message.error('上传失败');
				}
				this.uploadLoading = false;
			});
			if (resp.data.success) {
				this.$emit('upload-success');
				this.$message.success(resp.data.msg);
				// 上传成功
			} else {
				// 上传失败
				this.$message.error(resp.data.msg);
			}
			this.uploadLoading = false;
		},

		// 导入保障任务
		async importSupTask(file) {
			// let fileData = new FormData();
			// fileData.append("file", file);
			this.uploadLoading = true;
			let resp = (resp = await importSupTask(file).catch(err => {
				console.log(err);
				if (err.data.msg) {
					this.$message.error(err.data.msg);
				} else {
					this.$message.error('上传失败');
				}
				this.uploadLoading = false;
			}));
			if (resp.data.success) {
				// 上传成功
				this.$emit('upload-success');
				this.$message.success(resp.data.msg);
			} else {
				// 上传失败
				this.$message.error(resp.data.msg);
			}
			this.uploadLoading = false;
		},
	},
};
</script>

<style scoped lang="scss">
.upload-file-container {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	.upload-button {
		padding: 2.4rem;
	}
}
</style>
<style lang="scss">
.el-form {
	&.upload-form {
		width: 36rem;
		.el-form-item {
			display: flex;
		}
	}
}
</style>
