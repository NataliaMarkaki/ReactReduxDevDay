const { webpackConfigGenerator } = require("@caplin/webpack-config-app");

module.exports = function createWebpackConfig() {
  let webpackConfig = webpackConfigGenerator({
    basePath: __dirname
  });

  webpackConfig.node = { fs: "empty" };

  return webpackConfig;
};
