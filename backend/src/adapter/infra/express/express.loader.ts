import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { v4 as uuidv4 } from 'uuid'

import { authRouter, rootRouter } from '../../router'
import { redisClient } from '../redis/usecase'
import config from '../../config'

const RedisStore = connectRedis(session)

const expressLoader = async ({ app }: { app: express.Express }) => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  /**
   * redis를 store로 한 session 설정
   */
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: config.redis.secretKey,
      resave: false,
      genid: () => uuidv4(),
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10, // session max age in miliseconds
      },
    })
  )

  app.use('/', rootRouter)
  app.use('/auth', authRouter)
}

export default expressLoader
