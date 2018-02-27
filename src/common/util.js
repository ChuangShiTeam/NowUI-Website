var path = require('path');
var glob = require('glob');
// 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的view文件夹
var PAGE_PATH = path.resolve(__dirname, '../view');
// 用于做相应的merge处理
var merge = require('webpack-merge');

exports.entries = function () {
  var entryFiles = glob.sync(PAGE_PATH + '/*/*.js');
  var map = {};
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    map[filename] = filePath;
  });
  return map;
}

exports.htmlPlugin = function () {
  let entryHtml = glob.sync(PAGE_PATH + '/*.html');
  entryHtml = entryHtml.concat(glob.sync(PAGE_PATH + '/*/*.html'));
  console.log(entryHtml)
  let arr = [];
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filePath.replace(PAGE_PATH + '/', ''),
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', filename],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      });
    }
    arr.push(new HtmlWebpackPlugin(conf));
  });
  return arr;
}
