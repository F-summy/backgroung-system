import Mock from "mockjs";
Mock.mock("/api/blogtype", "get", {
  code: 0,
  msg: "",
  data: [
    {
      name: "vue", // 分类名称
      articleCount: 13, // 该分类下的文章数量
      order: 0, // 该分类的排序
      id: "60852d50049e92829e2dc9f8",
    },
    {
      name: "react", // 分类名称
      articleCount: 8, // 该分类下的文章数量
      order: 1, // 该分类的排序
      id: "60852d50049e92829e2dc9f8",
    },
  ],
});
