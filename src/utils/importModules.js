/**
 * 动态导入模块
 * `Example
 * asyncImportModules(require.context(modulePath, Boolean, RegExp))`
 * @param {function} r
 * @param {string} excludeFile 排除的文件
 */

const asyncImportModules = (r, excludeFile = null) => {
  const modules = {}
  r.keys().forEach(path => {
    const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1')
    if (excludeFile && !excludeFile.endsWith('.js')) {
      throw new Error(`error file name`)
    }
    if (`${moduleName}.js` !== excludeFile) {
      modules[moduleName] = r(path).default
    }
  })
  return modules
}

export default asyncImportModules
