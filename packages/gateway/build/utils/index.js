
const path = require("path");
const projectRootPath = path.resolve(__dirname, "../../");

function isBareModuleId(id) {
  return !id.startsWith(".") && !id.startsWith("/");
}

/**
 * 生成相对项目根目录的路径
 */
function resolvePath(...filePath) {
  return path.join(projectRootPath, ...filePath);
}
const Util = {
  isBareModuleId, resolvePath
}

module.exports = Util
