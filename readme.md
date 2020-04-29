<!--
 * @Description: desc
 * @Author: zhanghaoyu004
 * @Date: 2019-08-19 18:27:08
 * @LastEditTime: 2019-10-11 18:40:52
 * @LastEditors: zhanghaoyu004
 -->

## 解决的问题
由于现有的react-ssr项目中页面开发都是单独开发，但是每个页面的开发过程中都要重复创建server端和client端的特定文件以及复制粘贴别的页面代码，此命令行工具意在减少开发初期的重复性工作~
## 使用说明
符合现有react-ssr目录规范的项目根目录下运行以下命令：
1. newssr
2. 输入路由匹配规则，如果不输入需要文件创建完成后自己手动修改rewrite.js文件
3. 通过newssr -v查看本包版本信息

## 实现效果

![6ygw8-8tkek](https://tva1.sinaimg.cn/large/006y8mN6ly1g7zx4q0jy7g30ke0f8k5a.gif)

![t2as4-x76ha](https://tva1.sinaimg.cn/large/006y8mN6ly1g7zwu5c2zig30zi0qiu0x.gif)

![页面渲染完成](https://tva1.sinaimg.cn/large/006y8mN6ly1g7zx5jbbuzj30rs0ew76u.jpg)

## 实现说明

![image-20191012183757606](https://tva1.sinaimg.cn/large/006y8mN6ly1g7vlp08m1vj30rq0bon0d.jpg)

## 文件内各个参数说明
## actionPage
PageString：组件名
pageName：组件文件名
## clientPage
Page: 组件名

## todo
1. 集成bucky-cli生成api、model的功能
2. client/page中加上生命周期函数、加上component
3. 加上生成项目的功能