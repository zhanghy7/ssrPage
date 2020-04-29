// 浏览器端渲染页面
import React from "react";

// 引入灯塔监控
import "../statics/utils/pageCommon";
import { hydrate } from "react-dom";
// 引入埋点
import { initTrack } from "../statics/utils/postUlog";
// 引用客户端渲染的模板，和服务端同构
import PageComponent from "../pages/pageComponent";
// 处理服务端同步的数据（全局变量）
import { initServerData } from "../statics/utils";

initTrack({ uicode: "" }).then(
  instance => (window.contentTrack = instance)
);
// 客户端生成react实例
hydrate(
  <PageComponent data={initServerData()} />,
  document.getElementById("main-wrap")
);
