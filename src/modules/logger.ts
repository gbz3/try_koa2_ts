import log4js from 'log4js'

const appLogConfig: log4js.Configuration = {
  appenders: {
    'console': {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '[%d] [APP] [%p] : %m',
      },
    },
  },
  categories: { default: { appenders: ['console'], level: 'trace' } }
}

export const appLogger = log4js.configure(appLogConfig).getLogger()
