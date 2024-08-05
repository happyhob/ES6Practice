const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "none",

  entry: "./src/main.js",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,	// .css 또는 scss로 끝나는 파일 인식
        use: [
          "style-loader",	// html에 삽입해주는 역할
          "css-loader",	// 먼저 해석됨. js에서 css에서 인식하도록 해석
          "postcss-loader",	// 공급업체 접두사 적용
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html"
    }),
  ],

  devServer: {
    port: 9000
  }
}