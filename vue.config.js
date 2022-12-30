//vue.config.js 参考网址：https://cli.vuejs.org/zh/config/#lintonsave
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭语法检查
  //开启代理服务器（方式1）(注意改了vue.config.js文件后必须重新npm run serve)
  //这种方式不能配置多个代理，并且不能灵活控制走不走代理
  // devServer: {
  //   proxy: "http://localhost:5000", //只需要写到端口号
  // },
  devServer: {
    proxy: {
      // /api是请求前缀
      "/api": {
        target: "http://localhost:5000",
        //路径重写  第一个参数是正则 匹配所有/api开头的
        pathRewrite: { "^/api": "" },
        ws: true, //用于支持websocket
        changeOrigin: true, //用于控制请求头中的host值,一般设置为true
      },
      "/demo": {
        target: "http://localhost:5001",
        pathRewrite: { "^/demo": "" },
        ws: true, //用于支持websocket
        changeOrigin: true, //用于控制请求头中的host值
      },
    },
  },
});
