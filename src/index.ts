import Koa from 'koa'
import http2 from 'http2'
import fs from 'fs'

import { appLogger } from './modules/logger'

// Koa2 サーバ初期設定
const app = new Koa()

// ミドルウェア設定
app.use(async (ctx, next) => {
  ctx.body = "koa app."

  await next()

  appLogger.trace(`path=[${ctx.path}]`)
})

// HTTP/2 でサーバ起動
const port = process.env.PORT || 443
const options = {
  key: fs.readFileSync('ssc/server.key'),
  cert: fs.readFileSync('ssc/server.crt')
}
http2.createSecureServer(options, app.callback()).listen(port)
appLogger.info(`listening on port ${port}`)
