import request from "@/utils/request";

export function getCode() {
  return request({
    url: "/res/captcha",
    method: "get",
  });
}
