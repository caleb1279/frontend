const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
});

module.exports = {
  devServer: {
    proxy: {
      "^/": {
        target: ""+process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },
    },
  },
};
