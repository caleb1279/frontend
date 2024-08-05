const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
});

module.exports = {
  devServer: {
<<<<<<< HEAD
    proxy: {
      "^/": {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true,
      },
    },
  },
};
=======
      proxy: 'http://localhost:9000'
  } }
>>>>>>> 1b0874e1f91bc116e4baab45d31598000c4dd9df
