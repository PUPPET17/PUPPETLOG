import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import theme from "./theme.js";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

export default defineUserConfig({
  bundler: viteBundler(),

  dest: "./dev-ops/nginx/html",
  base: "/",

  lang: "zh-CN",
  title: "PUPPET1og",
  description: "关于我自己的学习成长经历",

  theme,
  plugins: [
    googleAnalyticsPlugin({
      // 配置项
      id: 'G-Y7E011YCDJ'
    }),
  ],
});
