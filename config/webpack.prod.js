const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./config');
const productionGzipExtensions = ['js', 'css'];
const sourceMapsMode = config.productionJsSourceMap ? 'source-map' : 'none';

const PreloadWebpackPlugin = require('preload-webpack-plugin')

module.exports = merge.smart(baseWebpackConfig, {
  mode: 'production',
  devtool: sourceMapsMode,
  output: {
    filename: 'js/[name].[contenthash:8].js', // contenthash：只有模块的内容改变，才会改变hash值
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(less|css)$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
              },
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  javascriptEnabled: true,
                }
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
              name: 'img/[name].[contenthash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          },
          { // 支持导入音频，下面这个配置必须放在最后
            exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'media/[path][name].[contenthash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 清理打包目录
    new CleanWebpackPlugin(),
    // 预读资源，优化用户体验的工具
    new PreloadWebpackPlugin({
      rel: 'preload',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      },
      include: ['app']
      // include:'allChunks'
    }),
    // 压缩代码
    new HtmlWebpackPlugin({
      template: config.indexPath,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeOptionalTags: false,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeAttributeQuotes: true,
        removeCommentsFromCDATA: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    // 压缩css
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
      // chunkFilename: '[name].[contenthash:8].chunk.css'
    }),
    // gzip压缩
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      threshold: 10240, // 大于10kb才会被压缩
      minRatio: 0.8
    }),
  ],
  optimization: {
    minimizer: [
      // 提取css
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: true ? { map: { inline: false }} : {}
      }),
      // 压缩js代码
      new TerserPlugin({
        sourceMap: config.productionJsSourceMap
      })
    ]
  }
})