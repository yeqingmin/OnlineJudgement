const { defineConfig } = require("@vue/cli-service");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
// module.exports = defineConfig({
//   transpileDependencies: true,
//   chainWebpack(config): void {
//     config.plugin("monaco").use(new MonacoWebpackPlugin());
//   },
// });
module.exports = {
  configureWebpack: {
    plugins: [new MonacoWebpackPlugin()],
  },
};
