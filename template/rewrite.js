/*
 * @Author: huanghui011
 * @Date: 2019-05-13 15:43:30
 * @Last Modified by: huanghui011
 * @Last Modified time: 2019-09-18 20:32:45
 *
 * 页面路由匹配设置
 *  "/partner" 开头的规则：http://wiki.lianjia.com/pages/viewpage.action?pageId=367324223
 *
 */

module.exports= [
  {
    /**
     * @description ajax的node-api入口。
     * @entry /dcontent/api/xxxx/xxx/xx
     * @return /api/xxx/xx/xxx
     */
    from: url => {
      if (/\/?dcontent\/api/.test(url)) {
        return url.replace(/\/?dcontent/, "");
      } else {
        return null;
      }
    },
    to: (url, match) => {
      if (match) return match;
    },
    break: true
  },
  {
    from: /partner\/login/i, // kol登录页
    to: "/page/partnerLogin",
    break: true
  },
  {
    from: /partner\/error/i, // kol无权限等错误页面
    to: "/page/partnerError",
    break: true
  },
  {
    from: /partner\/([a-zA-Z0-9]+)/i, // kol登录后查看数据页
    to: "/page/partnerDetail",
    break: true
  },
  {
    // 看点文章详情页
    from: url => {
      if (/^\/kandian\/([a-zA-Z0-9]){0,}\+{0,}={0,}.html$/.test(url)) {
        return "/page/kandian/detail";
      }
      if (/\/?beikehao\/feedpreview\/unpublished/.test(url)) {
        return "/page/kandian/detail";
      }
      if (/\/?kandianarticle\/[0-9]*.html/.test(url)) {
        return "/page/kandian/detail";
      }
      if (/\/kandiandrafts\/[0-9]*.html/.test(url)) {
        return "/page/kandian/detail";
      }
      if (/\/kandian\/preview\/[0-9]*.html/.test(url)) {
        return "/page/kandian/detail";
      }
      if (/\/kandian\/feedpreview\/previewout/.test(url)) {
        return "/page/kandian/detail";
      }
      return null;
    },
    to: (url, match) => {
      if (match) return match;
    },
    break: true
  },
  {
    from: /^\/?kandian\/?/i, // 首页
    to: "/page/kandian/kandianIndex",
    break: true
  },
  {
    from: /^\/?beikehao\/invite\/?/i, //贝壳号注册页面
    to: "/page/beikehao/invite",
    break: true
  },
  {
    from: /^\/beikehao\/content\/?/i, //《贝壳内容源授权协》
    to: "/page/beikehao/content",
    break: true
  },
  {
    from: /\/beikehao\/show\/([a-zA-Z0-9])/i, // 看点文章详情页
    to: "/page/kandian/beikehao",
    break: true
  },
  {
    from: /^\/kandian\/([a-zA-Z0-9]){0,}\+{0,}={0,}.html$/, //看点文章详情页
    to: "/page/kandian/detail"
  },
  {
    from: /\/dcontent\/aiguide\/([a-zA-Z0-9])/i, // 智能导购，落地页和看点文章详情页相同
    to: "/page/kandian/aidetail",
    break: true
  },
  {
    from: /guide\/([a-zA-Z0-9]+)/i, // 导购列表页
    to: "/page/guideList",
    break: true
  },
  {
    from: /shop\//i, // 购房节分会场
    to: "/page/shopFestival",
    break: true
  },
  {
    // 召回落地页
    from: /recallAuthorize/i,
    to: "/page/recall",
    break: true
  }
,
        {
          // 新页面路由匹配规则
          from: /dsad/i,
          to: "/page/kkk",
          break: true
        },
        {
          // 新页面路由匹配规则
          from: /dsad/,
          to: "/page/ddd",
          break: true
        },
        {
          // 新页面路由匹配规则
          from: /dsdsd/i,
          to: "/page/kkdk",
          break: true
        },
        {
          // 新页面路由匹配规则
          from: /dsds/i,
          to: "/page/jkasdjad",
          break: true
        }];
        