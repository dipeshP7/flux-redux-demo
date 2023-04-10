const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        loader: "babel-loader",
        include: [path.resolve(__dirname, "src")],
        test: /\.js?$/,
        options: {
          presets: ["@babel/preset-env"],
          plugins: ["transform-object-rest-spread"],
        },
      },
    ],
  },
  entry: {
    cpanel: "./src/control-panel.js",
    tasks: "./src/tasks.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    publicPath: "/assets/",
    filename: "[name].bundle.js",
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
  devtool: "source-map",
  mode: "development",
};
