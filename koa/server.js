/**
 * Created by H
 * User: huangcan
 * Date: 2018/10/9
 * Time: 1:54 PM
 */
// const path = require('path');
const logger = require('koa-logger')
const Koa = require('koa')
//const render = require('koa-ejs')
const onerror = require('koa-onerror')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('koa-router')()
const cors = require('koa2-cors')
const file = require('./api/index')
const addRouter = () => {
  file.forEach(obj => {
    if (obj.type === 'GET') {
      router.get(obj.path, obj.func)
    } else if (obj.type === 'POST') {
      router.post(obj.path, obj.func)
    }
  })
}
addRouter()

onerror(app)

app
    .use(logger())
    .use(cors())
    .use(bodyParser())
    .use(router.routes())
    .listen(3000)