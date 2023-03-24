import Vue from "vue";
import VueI18n from "vue-i18n";
// 从语言包文件中导入语言包对象
import zh from "./zh";
import en from "./en";
import enLocale from "element-ui/lib/locale/lang/en";
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import store from "@/store/index";
Vue.use(VueI18n);
const messages = {
  zh: {
    ...zh,
    ...zhLocale,
  },
  en: {
    ...en,
    ...enLocale,
  },
};
const i18n = new VueI18n({
  messages,
  locale: store.state.user.langs,
  fallbackLocale: "zh", // 若某个语言环境变量，则使用fallbackLocale环境下对应的变量
  silentFallbackWarn: true, // 抑制警告
  globalInjection: true, // 全局注入
});
export default i18n;
