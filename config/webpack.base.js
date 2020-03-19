const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const APP_PATH = path.resolve(__dirname, '../src');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const argv = require('yargs').argv;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const merge = require('webpack-merge');

const bundleAnalyzerReport = argv.report; // 根据命令参数是否含有 'report' 来决定是否生成报告
// 这个配置将合并到最后的配置中
const webpackConfig = {
  plugins: []
};
if (bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: path.join(config.assetsRoot, './report.html')
  }));
}


module.exports = merge(webpackConfig ,{
  entry: {
    app: './src/index.tsx',
    // 代码分包，还有一种方案是采用DLL
    vendor: ['react', 'react-dom']
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.publicPath
  },
  module: {
    rules: [
      { // 添加eslint检查代码规范
        enforce: 'pre',
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [APP_PATH],
        loader: 'eslint-loader',
        options: {
          emitWarning: true, // 这个配置需要打开，才能在控制台输出warning信息
          emitError: true, // 这个配置需要打开，才能在控制台输出error信息
          fix: false // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
        }
      },
      {
        oneOf: [
          {
            test: /\.(html)$/,
            loader: 'html-loader'
          },
          {
            test: /\.(j|t)sx?$/,
            include: APP_PATH,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    '@babel/preset-react',  // jsx支持
                    ['@babel/preset-env', { useBuiltIns: 'usage', corejs: 2 }] // 按需使用polyfill
                  ],
                  plugins: [
                    // 按需加载，可以将每个页面或组件拆成独立的包，减小首页加载内容的体积
                    '@babel/plugin-syntax-dynamic-import', 
                    ['@babel/plugin-proposal-class-properties', { 'loose': true }] // class中的箭头函数中的this指向组件
                  ],
                  cacheDirectory: true // 加快编译速度
                }
              },
              {
                loader: 'awesome-typescript-loader'
              }
            ]
          },
          { // 支持less和css
            test: /\.(less|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: false // 不启用css modules
                }
              },
              'postcss-loader', 
              {
                loader: 'less-loader',
                options: { javascriptEnabled: true }
              }
            ]
          },
          { // 支持导入svg图片
            test: /\.svg$/,
            use: ['@svgr/webpack']
          },
          { // 支持导入图片
            test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 10 * 1024, // 小于10kb的图片，会自动base64编码后插入到代码中
              name: 'img/[name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          },
          { // 支持导入音频，下面这个配置必须放在最后
            exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'media/[path][name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 自动判断后缀名，引入时可以不带后缀
    alias: {
      '@': path.resolve(__dirname, '../src/') // 以 @ 表示src目录
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: config.indexPath,
      showErrors: true
    }),
    // 拷贝除了index.html外的其他public文件到打包目录
    new CopyWebpackPlugin([
      {
        from: 'public',
        ignore: ['index.html']
      }
    ])
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        // 提取公共模块
        commons: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          name: 'common'
        }
      }
    }
  }
});