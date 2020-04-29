// 用于数据接口调用，规定数据格式和调用方式
import { reqconfig } from "../utils";
export default api => {
  api.config = reqconfig;
  api.config.base = "http://weapons.ke.com/mock";

  api("getList", {
    uri: "/1418/ai/guide/detaillargepic",
    method: "get",
    parameters: {}
  });
};
// 开发环境配置
export const development = api => {
  api.config.base = "http://weapons.ke.com/mock";
};

// 测试环境配置
export const testing = api => {
  api.config.base = "http://weapons.ke.com/mock";
};

// 预发环境
export const preview = api => {
  api.config.base = "http://weapons.ke.com/mock";
};
