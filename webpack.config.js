/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

module.exports = {
  rules: [
    {
      test: /\.less$/,
      loader: 'less-loader', // compiles Less to CSS
    },
  ],
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
};
