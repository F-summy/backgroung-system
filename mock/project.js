import Mock from "mockjs";
Mock.mock("/api/project", "get", {
  code: 0,
  msg: "",
  "data|3-5": [
    {
      description: ["知识点: transition、transform、计时器", "其他描述"], // 项目描述段落
      name: "@ctitle", // 项目名称
      url: "http://www.demo.com/wufenglunbotu", // 项目效果请求地址
      github: "https://github.com/DuYi-Edu/DuYi-Vue2", // 项目github地址
      thumb: "/static/upload/2023-1-2-16-40-36-871-eebb9.jpg", // 缩略图，项目截图
      order: 1, // 排序
      id: "608e44c7061eda77d299dbbe",
    },
  ],
});
