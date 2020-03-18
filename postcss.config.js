module.exports = {
    plugins: {
      // 如果是基于750px宽度设计图，那么设计图上1px就直接在样式中写1px即可，打包时会自动转为vw单位
      'postcss-aspect-ratio-mini': {}, // 处理元素容器的宽高比
      'postcss-write-svg': { //处理1px边框
        utf8: false
      },
      'postcss-px-to-viewport': {
        viewportWidth: 320,
        viewportHeight: 568,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 1,
        mediaQuery: false
      },
      cssnano: {
        'cssnano-preset-advanced': {
          zindex: false, // 这里一定要关掉，否则所有的z-index会被设为1
        }
      },
      autoprefixer: {}
    }
  };