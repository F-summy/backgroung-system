import request from "@/utils/request";

export function getBlog(page = 1, limit = 10) {
  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}
export function delBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "delete",
  });
}

//发布文章
export function addBlog(data) {
  return request({
    url: "/api/blog",
    method: "post",
    data,
  });
}

//修改文章
export function putBlog({ id, data }) {
  return request({
    url: `/api/blog/${id}`,
    method: "put",
    data,
  });
}
//查找某一篇文章
export function findOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: "get",
  });
}
