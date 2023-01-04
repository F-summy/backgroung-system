import Mock from "mockjs";
import qs from "querystring";
Mock.mock(/^\/api\/blog(\?.+)?$/, "get", function (options) {
  const query = qs.parse(options.url);
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      total: 28,
      [`rows|${query.limit || 5}`]: [
        {
          id: "@guid",
          title: "@ctitle", // 文章标题
          description: "@cparagraph(1, 3)", // 文章简介
          createDate: 1619941606475, // 发布日期 时间戳
          scanNumber: 10, // 浏览次数
          commentNumber: 4, // 评论量
          category: {
            // 分类信息
            id: "60852e6c3587f282fd5c5e80",
            name: "vue",
          },
          toc: [
            // 目录
            { name: "章节1", anchor: "title-1" },
            {
              name: "章节2",
              anchor: "title-2",
              children: [
                { name: "章节2-1", anchor: "title-2-1" },
                { name: "章节2-2", anchor: "title-2-2" },
              ],
            },
          ],
          thumb: "/static/upload/2021-4-25-10-25-33-23-62de35.jpg", // 缩略图
        },
      ],
    },
  });
});
Mock.mock(/^\/api\/blog\/.+$/, "delete", {
  code: 0,
  msg: "",
  data: {
    total: 28,
    "rows|5-8": [
      {
        id: "@guid",
        title: "@ctitle", // 文章标题
        description: "@cparagraph(1, 3)", // 文章简介
        createDate: 1619941606475, // 发布日期 时间戳
        scanNumber: 10, // 浏览次数
        commentNumber: 4, // 评论量
        category: {
          // 分类信息
          id: "60852e6c3587f282fd5c5e80",
          name: "vue",
        },
        toc: [
          // 目录
          { name: "章节1", anchor: "title-1" },
          {
            name: "章节2",
            anchor: "title-2",
            children: [
              { name: "章节2-1", anchor: "title-2-1" },
              { name: "章节2-2", anchor: "title-2-2" },
            ],
          },
        ],
        thumb: "/static/upload/2021-4-25-10-25-33-23-62de35.jpg", // 缩略图
      },
    ],
  },
});
