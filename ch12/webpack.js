// 기본 웹팩 설정
var webpack = require("webpack")

module.exports = {
  entry: "./index-client.js",
  output: {
    path: "assets",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'stage-0', 'react']
        }
      }
    ]
  }
}

// package.json 파일 안에 추가한다.
"script" : {
  "prestart": "./node_modules/.bin/webpack --progress"
}
