import Mock from "mockjs";

Mock.mock("/api/banner", "get", {
  code: 0,
  msg: "获取成功！",
  data: [
    {
      id: "610a55298c6b33085217d233",
      midImg: "/static/upload/2021-8-4-16-51-51-816-869af.jpg",
      bigImg: "/static/upload/2021-7-28-15-15-33-316-3fc18.jpeg",
      title: "火影忍者",
      description: "当年民工三大漫之一",
    },
    {
      id: "610a55298c6b33085217d234",
      midImg: "/static/upload/2021-6-29-10-23-30-427-57add.jpg",
      bigImg: "/static/upload/2021-7-28-15-14-57-139-f3dab.jpg",
      title: "钢之炼金术师",
      description: "这一刻，应该热泪盈眶",
    },
    {
      id: "610a55298c6b33085217d235",
      midImg: "/static/upload/2021-7-21-16-36-44-359-011cf.jpg",
      bigImg: "/static/upload/2021-7-28-15-17-11-265-6a3de.jpeg",
      title: "灌篮高手333",
      description: "大多数人童年篮球运动启蒙333",
    },
  ],
});
