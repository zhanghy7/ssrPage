#! /usr/bin/env node
const fs = require("fs"),
  path = require("path"),
  program = require("commander"),
  inquirer = require("inquirer");

const pkg = require("./package.json");
program.version(pkg.version, "-v, --version");

const {
  errorConsole,
  successConsole,
  fileBuildSuccess,
  warnConsole,
  writeDataToFile
} = require("./utils/index.js");

inquirer
  .prompt({
    type: "input",
    name: "fileName",
    message: "请输入文件名",
    validate: function(value) {
      const fileNameRegExp = /^[a-zA-Z]+$/g;
      if (fileNameRegExp.test(value)) {
        successConsole("文件名校验通过");
        return true;
      }
      if (value === ":q") {
        successConsole("您已退出~~~");
        return;
      }

      return "文件名只允许输入大小写字母，请重新输入";
    }
  })
  .then(data => {
    const { fileName } = data;
    // 字段名首字母小写
    const lowFileName = fileName.charAt(0).toLowerCase() + fileName.slice(1),
      // 字段名首字母大写
      upFileName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    // 引用公共方法检测文件是否能被正常创建
    const { fileIsOk } = require("./utils/index.js");

    // 是否允许创建
    let allowCreate = true;

    // 1. 创建server中action中的page
    const actionDirPath = "./src/server/actions/page",
      actionFilePath = `./src/server/actions/page/${lowFileName}.js`;
    if (!fileIsOk(actionDirPath, actionFilePath)) {
      allowCreate = false;
      return;
    }

    // 2. 创建client中entries中的文件
    const clientEntriesDir = "./src/client/entries",
      clientEntriesFile = `./src/client/entries/${lowFileName}.js`;
    if (!fileIsOk(clientEntriesDir, clientEntriesFile)) {
      allowCreate = false;
      return;
    }
    // 3. 创建client中的page
    const clientPagePath = `./src/client/pages/${lowFileName}/index.js`,
      clientPageLess = `./src/client/pages/${lowFileName}/index.less`,
      clientPageDirPath = path.resolve(`./src/client/pages/${lowFileName}`);
    // 如果文件夹不存在直接新建文件夹和文件
    if (fs.existsSync(clientPageDirPath)) {
      warnConsole(clientPageDirPath + "文件夹已存在，请重新输入文件名");
      allowCreate = false;
    }

    // 4. 创建server中的Model
    const serverModelDir = "./src/server/models",
      serverModelFile = `./src/server/models/${lowFileName}.js`;
    if (!fileIsOk(serverModelDir, serverModelFile)) {
      allowCreate = false;
      return;
    }
    // 如果所有文件都符合规范，则进行文件的创建
    if (allowCreate) {
      // 1. server/action/page
      const action = path.resolve(__dirname, "template/server/actionPage.js");
      fs.readFile(action, "utf8", function(err, data) {
        if (err) {
          errorConsole(err);
          return;
        }
        const newData = data
          .replace(/PageString/g, upFileName)
          .replace(/pageName/g, lowFileName);
        writeDataToFile(actionFilePath, newData);
      });
      // 2. 创建client中entries中的文件
      const entriesPath = path.resolve(__dirname, "template/client/entries.js");
      fs.readFile(entriesPath, "utf-8", (err, data) => {
        if (err) {
          errorConsole(err);
          return;
        }
        const tempData = data
          .replace(/PageComponent/g, upFileName)
          .replace(/pageComponent/g, lowFileName);
        writeDataToFile(clientEntriesFile, tempData);
      });

      // 3. 创建client中的page
      const clientPage = path.resolve(
        __dirname,
        "template/client/clientPage.js"
      );
      fs.readFile(clientPage, "utf8", function(err, data) {
        if (err) {
          errorConsole(err);
          return;
        }
        const newData = data.replace(/Page/g, upFileName);
        if (!fs.existsSync(clientPageDirPath)) {
          fs.mkdirSync(clientPageDirPath);
        }
        writeDataToFile(clientPagePath, newData);
        writeDataToFile(
          clientPageLess,
          `
        @import "../../statics/css/global.less";
        `
        );
      });
      // 4. 创建server中的Model
      const modelPath = path.resolve(__dirname, "template/server/model.js");
      fs.readFile(modelPath, "utf-8", (err, data) => {
        if (err) {
          errorConsole(err);
          return;
        }
        const modelData = data.replace(/Model/g, upFileName);
        writeDataToFile(serverModelFile, modelData);
      });

      // 5. 创建server中的APIs
      const serverApisDir = "./src/server/apis",
        serverApisFile = `./src/server/apis/${lowFileName}.js`;
      if (!fileIsOk(serverApisDir, serverApisFile)) {
        return;
      }
      const apisPath = path.resolve(__dirname, "template/server/api.js");
      fs.readFile(apisPath, "utf-8", (err, data) => {
        if (err) {
          errorConsole(err);
          return;
        }
        writeDataToFile(serverApisFile, data);
      });

      // 6. 写入路由匹配规则
      setTimeout(() => {
        inquirer
          .prompt({
            type: "confirm",
            message: "是否输入新页面的路由匹配规则",
            name: "confirm"
          })
          .then(data => {
            if (data.confirm) {
              appendRewrite(lowFileName);
            } else {
              warnConsole(
                "您未输入正确的路由匹配规则，本次新建后将不会新增路由规则，请您自行在server/configs/rewirte.js中进行配置~"
              );
            }
          });
      }, 100);
    }
  })
  .catch(err => {
    errorConsole(err);
  });

// 写入新页面的路由规则
function appendRewrite(lowFileName) {
  inquirer
    .prompt({
      type: "input",
      name: "route",
      message: "请输入新页面的路由匹配规则(正则表达式形式)"
    })
    .then(routeData => {
      const routeInput = routeData.route;
      try {
        if (
          !routeInput ||
          !eval(routeInput) ||
          !eval(routeInput) instanceof RegExp
        ) {
          warnConsole(
            "您未输入正确的路由匹配规则，本次新建后将不会新增路由规则，请您自行在server/configs/rewirte.js中进行配置~"
          );
          return;
        }
      } catch (err) {
        warnConsole(
          "您未输入正确的路由匹配规则，本次新建后将不会新增路由规则，请您自行在server/configs/rewirte.js中进行配置~"
        );
        return;
      }

      const rewriteDirPath = "./src/server/configs",
        rewritePath = path.resolve("./src/server/configs/rewrite.js");
      if (!fs.existsSync(rewriteDirPath)) {
        errorConsole(
          "./src/server/configs文件夹不存在，请在项目根目录下执行命令"
        );
        return;
      }

      // 方法二:复制一份rewrite.js文件，并替换export default为module.exports

      fs.readFile(rewritePath, "utf-8", (err, rewiteSourceData) => {
        if (err) {
          errorConsole(err);
          return;
        }
        const nodeModuleData = rewiteSourceData.replace(
          "export default",
          "module.exports="
        );
        const templatePath = path.resolve(__dirname, "template/rewrite.js");
        fs.writeFileSync(templatePath, nodeModuleData, (err, data) => {
          if (err) {
            errorConsole(err);
            return;
          }
        });

        // 如果路由已存在则不插入到rewrite.js
        if (routeIsExists(templatePath, routeInput)) {
          return;
        }

        const lastIndex = rewiteSourceData.lastIndexOf("]");
        let tempData = rewiteSourceData.slice(0, lastIndex);
        tempData += `,
        {
          // 新页面路由匹配规则
          from: ${routeInput},
          to: "/page/${lowFileName}",
          break: true
        }];
        `;

        fs.writeFile(rewritePath, tempData, (err, data) => {
          if (err) {
            errorConsole(err);
            return;
          }
          fileBuildSuccess("新页面的路由匹配规则已经写入~");
        });
      });
    });
}

// 检测路由是否已存在
function routeIsExists(templatePath, routeInput) {
  const rewriteArr = require(templatePath);
  // 如果路由已存在则存储到existRoute
  let existRoute = "";
  const hasRoute = rewriteArr.some(item => {
    if (String(item.from) === routeInput) {
      existRoute = item.from;
      return true;
    }
  });
  if (hasRoute) {
    errorConsole("路由" + existRoute + "已存在");
    return true;
  }
}
