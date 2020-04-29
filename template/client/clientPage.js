import React from "react";
import "./index.less";

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  // 客户端特定的操作(例如使用window对象等)都放到这个周期之后
  componentDidMount() {}

  render() {
    return <div>你好，我是新页面</div>;
  }
}

export default Page;
