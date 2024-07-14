import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import theme from "./theme.js";
import { baiduAnalyticsPlugin } from '@vuepress/plugin-baidu-analytics'

export default defineUserConfig({
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  
  dest: "./dev-ops/nginx/html",
  base: "/",

  lang: "zh-CN",
  title: "PUPPET1og",
  description: "关于我自己的学习成长经历",

  theme,
  plugins: [
    baiduAnalyticsPlugin({
      // 配置项
      id: 'dde81d59b7c7aafd3069d07bdb17e1a1',
    }),
  ],
});
