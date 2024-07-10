import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Lottery 项目开发日志",
      icon: "laptop-code",
      prefix: "md/dev-log/",
      children: ["Note01.md", "Note02.md", "Note03.md", "Note04.md", "Note05.md", "Note06.md", "Note07.md", "Note08.md","Note09.md","Note10.md"],
    },
  ],
});
