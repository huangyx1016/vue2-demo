<!--  -->
<template>
  <div class="container">
    <div class="content-box">
      <div class="left-box"></div>
      <div class="right-box">
        <div class="tools-box">
          <!-- 搜索组件 -->
          <div class="search-container">
            <Search
              :searchStyle="{ width: '300px' }"
              :placeholder="'请输入保障任务名称'"
              :loading="searchLoading"
              :disabled="isDisabled"
              @search="searchHandleTable"
              v-model="searchValue"
            />
          </div>
          <div class="operation-box">
            <el-button type="primary" @click="isUpload = true" plain
              >批量导入</el-button
            >
            <el-button type="primary" @click="handleExcel" plain
              >导出</el-button
            >
            <el-button type="primary" @click="handleExcelAll" plain
              >全部导出</el-button
            >
            <el-button type="danger" plain @click="handelDeleteAll"
              >删除</el-button
            >
            <el-button type="primary" icon="el-icon-plus" @click="addBzrw"
              >新增</el-button
            >
          </div>
        </div>
        <div class="table-list-container">
          <el-table
            class="table-container"
            v-loading="listDataLoading"
            :data="tableData"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" align="center" width="50">
            </el-table-column>

            <el-table-column
              label="序号"
              width="55"
              align="center"
              title="序号"
            >
              <template slot-scope="scope">
                {{
                  pageInfo.size * (pageInfo.curPage - 1) + (scope.$index + 1)
                }}
              </template>
            </el-table-column>

            <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip -->
            <el-table-column
              prop="supportTaskName"
              label="保障任务名称"
              align="center"
              :show-overflow-tooltip="true"
              :render-header="renderHeader"
            >
            </el-table-column>

            <el-table-column
              prop="warTaskName"
              label="所属作战任务"
              align="center"
              :show-overflow-tooltip="true"
              :render-header="renderHeader"
            >
            </el-table-column>
            <!-- <el-table-column width="440" align="center"> </el-table-column> -->
            <el-table-column label="状态" align="center" width="100">
              <template slot-scope="scope">
                <!-- 状态 01-未启动 02-进行中 03-已完成 -->
                <p v-if="scope.row.startUpStatus == '01'">未启动</p>
                <p v-else-if="scope.row.startUpStatus == '02'">进行中</p>
                <p v-else-if="scope.row.startUpStatus == '03'">已完成</p>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="315" align="center">
              <template slot-scope="scope">
                <!-- 仅参谋长启动操作且仅未启动状态有此操作 -->
                <span class="operation-span" @click="handleStart(scope.row)"
                  >启动</span
                >
                <span class="operation-span" @click="handleDetail(scope.row)"
                  >详情</span
                >
                <!-- <span
                  class="operation-span"
                  @click="showFeedBackList(scope.row)"
                  >CCIRs概览</span
                > -->
                <span class="operation-span" @click="handleEdit(scope.row)"
                  >编辑</span
                >
                <span
                  class="operation-span delete"
                  :class="{ isDisable: scope.row.reqProgress === '满足' }"
                  @click="handleDelete(scope.row)"
                  >删除</span
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- <div class="gantt-list-container">
            <GanttView :tasks="newTableData" />
          </div> -->
        </div>
        <div class="page-box">
          <!-- 分页 -->
          <Pagination
            :layout="pageInfo.layout"
            :total="pageInfo.total"
            :size="pageInfo.size"
            :singleHide="pageInfo.singleHide"
            :currentPage="pageInfo.curPage"
            @change="changePage"
            @changeSize="changePageSize"
          />
        </div>
        <!-- 新增/编辑保障任务对话框 -->
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogFormVisible"
          width="641px"
          center
          class="commonDialog"
          :close-on-click-modal="addBzrwLoading"
          id="bzrwDialog"
        >
          <el-form
            :model="form"
            class="add-task-form"
            :rules="rules"
            ref="form"
          >
            <el-form-item
              label="所属作战任务"
              :label-width="formLabelWidth"
              prop="warTaskId"
            >
              <el-select
                v-model="form.warTaskId"
                filterable
                allow-create
                default-first-option
                placeholder="请选择作战任务名称"
                @change="changeWarTask"
              >
                <el-option
                  v-for="(item, index) in listData"
                  :key="index"
                  :label="item.taskName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="保障任务名称"
              :label-width="formLabelWidth"
              prop="supportTaskName"
            >
              <el-input
                v-model="form.supportTaskName"
                autocomplete="off"
                placeholder="请输入任务名称"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="所属阶段名称"
              :label-width="formLabelWidth"
              prop="warPhaseId"
              clearable
            >
              <el-select
                v-model="form.warPhaseId"
                filterable
                allow-create
                default-first-option
                placeholder="请选择所属阶段名称"
                @change="changeWarPhase"
                clearable
              >
                <el-option
                  v-for="(item, index) in warPhaseOption"
                  :key="index"
                  :label="item.phaseName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="所属作战行动"
              :label-width="formLabelWidth"
              prop="warActionId"
            >
              <el-select
                v-model="form.warActionId"
                filterable
                allow-create
                default-first-option
                placeholder="请选择作战行动名称"
                @change="warActionSelectChange"
                clearable
              >
                <el-option
                  v-for="(item, index) in warActionOption"
                  :key="index"
                  :label="item.actionName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="保障任务时间"
              :label-width="formLabelWidth"
              prop="timeValue"
            >
              <el-date-picker
                v-model="form.timeValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                class="time-range"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="指导原则"
              :label-width="formLabelWidth"
              prop="guidelines"
            >
              <el-input
                type="textarea"
                v-model="form.guidelines"
                placeholder="请输入保障任务原则、作战决心、CCIRS保障重点等"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="描述"
              :label-width="formLabelWidth"
              prop="description"
            >
              <el-input
                type="textarea"
                v-model="form.description"
                placeholder="请输入描述"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item label="任务标签" :label-width="formLabelWidth">
              <div class="add-tags">
                <el-tag
                  :key="i"
                  v-for="(tag, i) in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleCloseTag(tag)"
                  class="tag-add"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisibleTag"
                  v-model="inputValueTag"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirmTag"
                  @blur="handleInputConfirmTag"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInputTag"
                  >+ 新增标签</el-button
                >
              </div>
            </el-form-item>
            <el-form-item
              label="发布范围"
              :label-width="formLabelWidth"
              prop="cmPersonnel"
            >
              <el-select
                v-model="form.cmPersonnel"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择参谋长"
              >
                <el-option
                  v-for="(item, index) in cmPersonnelOptions"
                  :key="index"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              @click="dialogFormVisible = false"
              :disabled="addBzrwLoading"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="addSupTaskHandle('form')"
              :loading="addBzrwLoading"
              >确 定</el-button
            >
          </div>
        </el-dialog>
        <!-- 保障任务启动对话框 -->
        <!-- <el-dialog
          title="保障任务启动"
          :visible.sync="dialogStartVisible"
          width="641px"
          center
          class="commonDialog"
          :close-on-click-modal="startBzrwLoading"
          id="startBzrwDialog"
        >
          <el-form
            :model="supportTaskStartform"
            class="add-task-form"
            :rules="startSupportTaskRules"
            ref="supportTaskStartform"
          >
            <el-form-item
              label="保障任务名称"
              :label-width="formLabelWidth"
              prop="supportTaskName"
            >
              <el-input
                v-model="supportTaskStartform.supportTaskName"
                autocomplete="off"
                placeholder="请输入保障任务名称"
                size="medium"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="所属作战任务"
              :label-width="formLabelWidth"
              prop="warTaskId"
            >
              <el-select
                v-model="supportTaskStartform.warTaskId"
                filterable
                allow-create
                default-first-option
                placeholder="请选择作战任务名称"
                disabled
              >
                <el-option
                  v-for="(item, index) in listData"
                  :key="index"
                  :label="item.taskName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="所属作战阶段"
              :label-width="formLabelWidth"
              prop="warPhaseId"
            >
              <el-select
                v-model="supportTaskStartform.warPhaseId"
                filterable
                allow-create
                default-first-option
                placeholder="请选择作战阶段名称"
                @change="getWarActionOptionData"
                disabled
              >
                <el-option
                  v-for="(item, index) in warPhaseOption"
                  :key="index"
                  :label="item.phaseName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="所属作战行动"
              :label-width="formLabelWidth"
              prop="warActionId"
            >
              <el-select
                v-model="supportTaskStartform.warActionId"
                filterable
                allow-create
                default-first-option
                placeholder="请选择作战行动名称"
                @change="warActionSelectChange"
                disabled
              >
                <el-option
                  v-for="(item, index) in warActionOption"
                  :key="index"
                  :label="item.actionName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="保障任务时间"
              :label-width="formLabelWidth"
              prop="timeValue"
            >
              <el-date-picker
                disabled
                v-model="supportTaskStartform.timeValue"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                class="time-range"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item
              label="指导原则"
              :label-width="formLabelWidth"
              prop="guidelines"
            >
              <el-input
                type="textarea"
                v-model="supportTaskStartform.guidelines"
                placeholder="请输入保障任务原则、作战决心、CCIRS保障重点等"
                size="medium"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item
              label="指导原则细化"
              :label-width="formLabelWidth"
              prop="guidelinesFurtherDesc"
            >
              <el-input
                type="textarea"
                v-model="supportTaskStartform.guidelinesFurtherDesc"
                placeholder="指导原则细化"
                size="medium"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="CCIRs生成人员"
              :label-width="formLabelWidth"
              prop="createPersonnel"
            >
              <el-select
                v-model="supportTaskStartform.createPersonnel"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="CCIRs生成人员"
              >
                <el-option
                  v-for="(item, index) in createPersonnelOptions"
                  :key="index"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="CCIRs分解人员"
              :label-width="formLabelWidth"
              prop="splitPersonnel"
            >
              <el-select
                v-model="supportTaskStartform.splitPersonnel"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="CCIRs分解人员"
              >
                <el-option
                  v-for="(item, index) in splitPersonnelOptions"
                  :key="index"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="CCIRs满足人员"
              :label-width="formLabelWidth"
              prop="meetPersonnel"
            >
              <el-select
                v-model="supportTaskStartform.meetPersonnel"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="CCIRs满足人员"
              >
                <el-option
                  v-for="(item, index) in meetPersonnelOptions"
                  :key="index"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="CCIRs反馈人员"
              :label-width="formLabelWidth"
              prop="cmFeedBackStaff"
            >
              <el-select
                v-model="supportTaskStartform.cmFeedBackStaff"
                placeholder="CCIRs反馈人员"
              >
                <el-option
                  v-for="(item, index) in feedBackPersonnelOptions"
                  :key="index"
                  :label="item.username"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button
              @click="dialogStartVisible = dialogStartVisible = false"
              :disabled="startBzrwLoading"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="startupTaskHandle('supportTaskStartform')"
              :loading="startBzrwLoading"
              >启动</el-button
            >
          </div>
        </el-dialog> -->
      </div>
    </div>
    <!-- <el-dialog
      title="批量导入"
      :visible.sync="isUpload"
      width="641px"
      center
      class="upload-Dialog"
      :close-on-click-modal="false"
    >
      <UploadFile
        :modelType="`bzrw`"
        @upload-success="upLoadHandler"
        v-if="isUpload"
      />
    </el-dialog> -->
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Pagination from "@/components/pagination.vue";
export default {
  components: { Search, Pagination },
  data() {
    return {
      tableData: [
        { id: 1, supportTaskName: "bzrw1", warTaskName: "zzrw1" },
        { id: 2, supportTaskName: "bzrw2", warTaskName: "zzrw1" },
        { id: 3, supportTaskName: "bzrw3", warTaskName: "zzrw1" },
        { id: 4, supportTaskName: "bzrw5", warTaskName: "zzrw1" },
      ],
      searchValue: "", // 搜索框内容
      searchLoading: false, // 搜索加载中
      isDisabled: false, // 加载中是否禁用整个搜索框 || 只禁用搜索图标
      // 列表分页信息
      pageInfo: {
        // 分页要显示的内容：总条数、每页条数、上一页、页数、下一页、页面跳转
        layout: "prev, pager, next",
        total: 0, // 总条数
        size: 10, // 每页条数
        singleHide: true, // 当只有一页的时候是否隐藏分页组件
        curPage: 1, // 当前页码
      },
      listDataLoading: false,
      listData: [],
      dialogFormVisible: false,
      dialogTitle: "新增保障任务",
      form: {
        warTaskId: null, //作战任务名称
        supportTaskName: "", //保障任务名称
        warPhaseId: null, //所属作战阶段
        warActionId: null, //所属作战行动
        guidelines: "", //指导原则
        description: "", //描述
        cmPersonnel: [], //参谋人员
        timeValue: [], // 保障任务开始时间和结束时间
      },
      formLabelWidth: "130px", // 表单项宽度
      // 新增保障任务加载动画是否开启
      addBzrwLoading: false,
      pickerDate: [],
      rules: {
        //表单字段校验
        warTaskId: [
          { required: true, message: "请选择作战任务", trigger: "blur" },
        ],
        supportTaskName: [
          { required: true, message: "请输入保障任务名称", trigger: "blur" },
        ],
      },
      warPhaseOption: [],
      warActionOption: [],
      // 新增任务标签
      dynamicTags: [],
      inputVisibleTag: false,
      inputValueTag: "", // 新增标签输入框的值
      cmPersonnelOptions: [],
    };
  },
  methods: {
    searchHandleTable() {},
    handleExcel() {},
    handleExcelAll() {},
    handelDeleteAll() {},
    addBzrw() {
      this.dialogFormVisible = true;
      this.dialogTitle = "新增保障任务";
    },
    //列标题 Label 区域渲染使用的 Function 用于表头内容过长时鼠标移入显示对应的title信息
    renderHeader(h, data) {
      return h("span", [
        h(
          "el-tooltip",
          {
            attrs: {
              class: "item",
              effect: "dark",
              content: data.column.label,
              placement: "top",
            },
          },
          [h("span", data.column.label)]
        ),
      ]);
    },
    handleStart() {},
    handleDetail() {},
    showFeedBackList() {},
    handleEdit() {},
    handleDelete() {},
    changeWarTask() {},
    changeWarPhase() {},
    warActionSelectChange() {},
    /**新增任务标签 */
    // 关闭标签
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInputTag() {
      this.inputVisibleTag = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirmTag() {
      let inputValueTag = this.inputValueTag;
      if (inputValueTag) {
        this.dynamicTags.push(inputValueTag);
      }
      this.inputVisibleTag = false;
      this.inputValueTag = "";
    },
    //表格多选
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach((item) => {
        this.multipleSelection.push(item.id);
      });
    },
    // 切换页面时触发
    changePage(e) {},
    // 切换每页展示的条数时触发
    changePageSize(e) {
      console.log(e);
    },
  },
  computed: {
    pickerOptions() {
      var _this = this;
      return {
        disabledDate(time) {
          if (_this.pickerDate.length < 2) return false;
          const start = new Date(_this.pickerDate[0]);
          let endTime = new Date(_this.pickerDate[1]);
          //最大值三个月范围限制
          return time.getTime() > endTime || time.getTime() < start;
        },
      };
    },
  },
  watch: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.container {
  .content-box {
    display: flex;
  }
  .left-box {
    width: 25%;
    height: 100vh;
    border: 1px solid black;
    box-sizing: border-box;
  }
  .right-box {
    width: 75%;
    .operation-box {
      display: flex;
    }
    .table-list-container {
      .delete {
        color: #f13a30;
      }
    }
    .operation-span {
      margin-right: 1rem;
      cursor: pointer;
      color: #333;
      font-size: 1.3rem;
    }
  }
}
</style>
