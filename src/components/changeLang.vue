<!-- 切换语言全局组件 -->
<template>
  <!--新增切换语言按钮-->
  <div class="change-lans">
    <!-- <el-radio-group v-model="currentLangs" @change="changeLang">
      <el-radio :label="'zh'">中文</el-radio>
      <el-radio :label="'en'">英文</el-radio>
    </el-radio-group> -->
    <div class="language-txt">语言：</div>
    <el-select v-model="currentLangs" @change="changeLang" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ currentLangsLabel }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in options"
          :key="index"
          :command="item.value"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentLangs: this.$store.state.user.langs || "zh", //当前语言是zh/en
      options: [
        {
          value: "zh",
          label: "中文",
        },
        {
          value: "en",
          label: "英文",
        },
      ],
      currentLangsLabel: "语言",
    };
  },
  computed: {},
  watch: {},
  methods: {
    //切换语言
    changeLang(val) {
      this.$nextTick(() => {
        this.$store.commit("user/setLangInfo", val);
        localStorage.setItem("lang", val);
        this.$i18n.locale = val;
      });
    },
    handleCommand(command) {
      console.log(command);
      this.$nextTick(() => {
        this.$store.commit("user/setLangInfo", command);
        localStorage.setItem("lang", command);
        this.$i18n.locale = command;
        this.currentLangsLabel = command;
      });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.change-lans {
  display: flex;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  .language-txt {
    font-size: 20px;
    font-weight: 400;
  }
}
</style>
