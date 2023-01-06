import Mock from "mockjs";
import qs from "querystring";
Mock.mock(/^\/api\/comment\/?(\?.+)?$/, "get", function (options) {
  const query = qs.parse(options.url);

  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      "total|12-55": 0,
      [`rows|${query.limit || 10}`]: [
        {
          nickname: "@cname", // 昵称
          content: "@cparagraph(1, 5)", // 评论内容
          createDate: Date.now(), // 评论日期，时间戳
          "avatar|1": [
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
            "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
          ], // 头像地址
          id: "@guid",
          blog: {
            title: "@ctitle", // 评论的文章标题
            id: "6086909cfd71d01dbb7bae0e",
          },
        },
      ],
    },
  });
});
