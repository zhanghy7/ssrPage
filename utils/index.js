/*
 * @Description: desc
 * @Author: zhanghaoyu004
 * @Date: 2019-10-12 11:09:41
 * @LastEditTime: 2019-10-12 11:36:19
 * @LastEditors: zhanghaoyu004
 */
// 检测文件是否已存在
const fs = require("fs");
function isExists(pathStr) {
  if (fs.existsSync(pathStr)) {
    return true;
  }
}

// 文件是否可以被正常创建
function fileIsOk(dirPath, filePath) {
  if (!isExists(dirPath)) {
    console.log(
      errorConsole(dirPath + "文件夹不存在，请确保在项目根目录执行命令")
    );
    return false;
  }
  if (isExists(filePath)) {
    console.log(errorConsole(filePath + "文件已存在，请更换文件名并重试"));
    return false;
  }
  return isExists(dirPath) && !isExists(filePath);
}

const chalk = require("chalk"),
  logSymbols = require("log-symbols");

// 打印红色输出
function errorConsole(str) {
  return console.log(logSymbols.error, chalk.red(str));
}

// 打印绿色输出
function successConsole(str) {
  return console.log(logSymbols.info, chalk.green(str));
}

// 执行成功标识
function fileBuildSuccess(str) {
  return console.log(logSymbols.success, str);
}

// 打印黄色输出
function warnConsole(str) {
  return console.log(logSymbols.warning, chalk.yellow(str));
}

// 写入文件
function writeDataToFile(filePath, newData) {
  if (!filePath) {
    errorConsole(filePath + "不存在");
    return;
  }
  fs.writeFile(filePath, newData, (err, data) => {
    if (err) {
      errorConsole(err);
      return;
    }
    fileBuildSuccess(filePath, "文件已创建成功~");
  });
}

module.exports = {
  isExists,
  fileIsOk,
  errorConsole,
  successConsole,
  warnConsole,
  fileBuildSuccess,
  writeDataToFile
};
