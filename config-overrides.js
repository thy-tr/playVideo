/**
 * Created by H
 * User: huangcan
 * Date: 2018/10/26
 * Time: 6:14 PM
 */
const path = require('path')
const {injectBabelPlugin} = require('react-app-rewired')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override(config, env) {

  config = injectBabelPlugin(['@babel/plugin-proposal-decorators', {"legacy": true}], config)   //{ "legacy": true }一定不能掉，否则报错

  config.resolve.alias = {
    'pages': resolve('src/pages'),
    'api': resolve('src/api'),
    'components': resolve('src/components'),
    'static': resolve('src/static')
  }

  return config
}