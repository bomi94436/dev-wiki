import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { v4 as uuidv4 } from 'uuid'
import cors, { CorsOptions } from 'cors'

import { authRouter, rootRouter } from '../../router'
import { redisClient } from '../redis/usecase'
import config from '../../config'
import { SESSION_KEY } from '../../../global/constant'

const RedisStore = connectRedis(session)

const whitelist = ['http://localhost:3000']
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}

const expressLoader = async ({ app }: { app: express.Express }) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors(corsOptions))

  /**
   * redis를 store로 한 session 설정
   */
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: config.redis.secretKey,
      resave: false,
      name: SESSION_KEY,
      genid: () => uuidv4(),
      cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 60,
      },
    })
  )

  app.use('/', rootRouter)
  app.use('/auth', authRouter)
}

export default expressLoader
