// 服务端渲染页面
import React from "react";
import { renderToString } from "react-dom/server";
// react模板路径，client/pages
import PageString from "../../../client/pages/pageName";

import { initLinkSrc, initScriptSrc, setGlobalState } from "../../utils";

export default {
  // 是否页面需要登陆
  needLogin: false,
  async handler(ctx) {
    let res = {};
    let mainDom = "",
      scriptSrc = "",
      linkUrl = "",
      title = "【贝壳找房】",
      keyword = "【贝壳找房】",
      desc = "【贝壳找房】";

    mainDom = renderToString(<PageString data={res} />);
    scriptSrc = initScriptSrc("pageName");
    linkUrl = initLinkSrc("pageName");
    // 把服务端渲染的数据，通过全局变量的形式，同步给客户端，避免客户端重复渲染
    const globalState = setGlobalState(res);
    ctx.response.render(
      "layout",
      {
        title,
        keyword,
        desc,
        mainDom,
        globalState,
        scriptSrc,
        linkUrl
      },
      { layout: null }
    );
  }
};
