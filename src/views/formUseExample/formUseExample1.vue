<!-- elementui表单 -->
<template>
  <div class="container">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" prop="date1">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd('form')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('form')">取消</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="handleAddDialogForm">新增</el-button>
    <el-button type="primary" @click="handleEditDialogForm">编辑</el-button>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormVisible"
      width="900px"
      center
      class="commonDialog"
      :close-on-click-modal="loading"
      @close="beforeCloseDialog"
      ref="dialogRef"
    >
      <el-form
        ref="dialogForm"
        :model="dialogForm"
        :rules="dialogFormRules"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
          <el-input v-model="dialogForm.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialogForm" :disabled="loading"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="submitFormDialog('dialogForm')"
          :loading="loading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tableLoading: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "100px",
      dialogForm: {
        name: "",
        age: null,
      },
      dialogFormRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      dialogTitle: "新增",
      dialogFormVisible: false,
      loading: false,
    };
  },
  computed: {},
  watch: {
    // dialogFormVisible: {
    //   handler() {
    //     if (!this.dialogFormVisible) {
    //       this.resetDialogForm();
    //     }
    //   },
    // },
  },
  methods: {
    handleAdd(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log("点击重置按钮");
      console.log(formName);
      this.$refs[formName].resetFields();
      console.log(this.form);
    },
    submitFormDialog() {},
    //点击打开新增弹窗
    handleAddDialogForm() {
      this.dialogFormVisible = true;
      this.dialogTitle = "新增";
      // this.dialogForm.name = "张三";
      // this.dialogForm.age = 18;
    },
    //点击打开编辑弹窗
    handleEditDialogForm() {
      this.dialogTitle = "编辑";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.dialogForm = {
          name: "张三",
          age: 18,
        };
      });
    },
    submitFormDialog(formName) {
      console.log("提交弹窗内的表单");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closeDialogForm() {
      this.dialogFormVisible = false;
    },
    //@close Dialog 关闭的回调
    handleCloseDialog() {
      this.resetDialogForm();
      this.dialogFormVisible = false;
      console.log(this.dialogForm);
    },

    //:before-close
    beforeCloseDialog() {
      console.log("dialog销毁前");
      this.$refs.dialogForm.resetFields();
      // this.resetDialogForm();
      this.dialogFormVisible = false;
      console.log(this.dialogForm);
    },
    resetDialogForm() {
      this.$nextTick(() => {
        this.$refs.dialogForm.resetFields(); //重置表单
        this.dialogForm = {
          name: "",
          age: null,
        };
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped></style>
