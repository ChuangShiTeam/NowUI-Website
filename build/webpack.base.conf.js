'use strict'
const path = require('path');
const fs = require('fs-extra');
const utils = require('./utils');
const config = require('../config');
const helper = require('./helper');
const vueWebTemp = helper.rootNode('.temp');
const vueLoaderConfig = require('./vue-loader.conf');
let webEntry = {};

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const constant = require('../src/common/constant');
const util = require('../src/common/util');

// Wraping the entry file for web.
const getEntryFileContent = (entryPath, vueFilePath) => {
  let relativeVuePath = path.relative(path.join(entryPath, '../'), vueFilePath);
  let relativeEntryPath = helper.rootNode('./src/entry.js');
  //let relativePluginPath = helper.rootNode(config.pluginFilePath);

  let contents = '';
  let entryContents = fs.readFileSync(relativeEntryPath).toString();
  // if (isWin) {
  //   relativeVuePath = relativeVuePath.replace(/\\/g, '\\\\');
  //   relativePluginPath = relativePluginPath.replace(/\\/g, '\\\\');
  // }
  // if (hasPluginInstalled) {
  //   contents += `\n// If detact plugins/plugin.js is exist, import and the plugin.js\n`;
  //   contents += `import plugins from '${relativePluginPath}';\n`;
  //   contents += `plugins.forEach(function (plugin) {\n\tweex.install(plugin)\n});\n\n`;
  //   entryContents = entryContents.replace(/weex\.init/, match => `${contents}${match}`);
  //   contents = ''
  // }

  contents += `\nimport App from '${relativeVuePath}';\n`;
  contents += `\n`;
  contents += `new Vue({\n`;
  contents += `  el: '#app',\n`;
  contents += `  components: {App},\n`;
  contents += `  template: '<App/>'\n`;
  contents += `});\n`;
  return entryContents + contents;
}

// Retrieve entry file mappings by function recursion
const getEntryFile = (dir) => {
  dir = dir || '.';
  const directory = helper.root(dir);
  fs.readdirSync(directory).forEach((file) => {
    const fullpath = path.join(directory, file);
    const stat = fs.statSync(fullpath);
    const extname = path.extname(fullpath);
    if (stat.isFile() && extname === '.vue' && fullpath.indexOf('view') > -1) {
      let name = path.join(dir, path.basename(file, extname));
      name = name.replace('view/', '') + '.html';
      if (extname === '.vue') {
        const entryFile = path.join(vueWebTemp, dir, path.basename(file, extname) + '.js');
        fs.outputFileSync(path.join(entryFile), getEntryFileContent(entryFile, fullpath));
        if (constant.active == 'dev') {
          for (var i = 0; i < constant.webEntry.length; i++) {
            if (constant.webEntry[i] == name.replace(/\\/g, '/')) {
              webEntry[name] = path.join(entryFile);
            }
          }
        } else {
          webEntry[name] = path.join(entryFile);
        }
      }
    }
    else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
      const subdir = path.join(dir, file);
      getEntryFile(subdir);
    }
  });
}

getEntryFile();
// console.log(webEntry);

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: webEntry,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
