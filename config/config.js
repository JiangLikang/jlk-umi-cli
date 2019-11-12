
// ref: https://umijs.org/config/
import { primaryColor } from '../src/default.setting';
import pageRoutes from './router.config'
import webpackPlugin from './plugin.config';


// const targetUrl = 'http://10.50.6.38:8081'; // 后端本地
// const targetUrl = 'https://v1test.tf56.com'; // 测试

export default {
  treeShaking: true,
  history: 'hash',
  hash: true,
  publicPath: './',
  targets: { // 配置浏览器最低版本，会自动引入 polyfill 和做语法转换
    ie: 11
  },
  theme: {
    "@primary-color": primaryColor
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  urlLoaderExcludes: [
    /^.md$/
  ],
  chainWebpack: webpackPlugin,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        // loadingComponent: './src/components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      dll: true,
      locale: {
        enable: true,
        default: 'zh-CN',
        baseNavigator: true
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }]
  ],
  routes: pageRoutes,
  alias: {
    '@': require('path').resolve(__dirname, 'src'),
  },
  proxy: {
    "/api": {
      "target": 'https://www.easy-mock.com/mock/5d099b1e209147512835a8d4/singlePort',
      "changeOrigin": true,
      "pathRewrite": {
        '^/api': ''
      }
    }
  }
}
