import * as uuid from 'uuid'
import Koa from 'koa'
import log4js from 'log4js'

// Koa.Context に logger プロパティを追加
declare module 'koa' {
  interface DefaultContext {
    logger: log4js.Logger,
  }
}

const HEADER_NAME = 'x-request-id'
const buildConfig = (rid: string) => ({
  appenders: {
    'console': {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '[%d] [%x{requestId}] [%p] : %m',
        tokens: { requestId: rid },
      },
    },
  },
  categories: { default: { appenders: ['console'], level: 'trace' } }
})

export const mwRequestId = async (ctx: Koa.Context, next: Koa.Next) => {
  const requestId = ctx.request.get(HEADER_NAME) || uuid.v4()
  ctx.set(HEADER_NAME, requestId)
  ctx.logger = log4js.configure(buildConfig(requestId)).getLogger()

  await next()
}
