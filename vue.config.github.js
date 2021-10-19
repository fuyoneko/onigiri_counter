module.exports = {
  outputDir: "docs",
  publicPath: "/onigiri_counter/",
  pages: {
    index: {
      entry: "src/main.js",
      title: "おにぎり電卓",
    },
  },
  transpileDependencies: ["vuetify"],
};
