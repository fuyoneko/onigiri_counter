module.exports = {
  outputDir: "docs",
  assetsDir: "./",
  publicPath: "./",
  pages: {
    index: {
      entry: "src/main.js",
      title: "おにぎり電卓",
    },
  },
  transpileDependencies: ["vuetify"],
};
