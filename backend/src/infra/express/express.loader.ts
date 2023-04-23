import express from 'express'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { v4 as uuidv4 } from 'uuid'
import cors, { CorsOptions } from 'cors'
import path from 'path'

import { SESSION_KEY, STATIC_UPLOAD_FOLDER_PATH } from 'global/constant'
import { getRelativePathOfProjectRootPath } from 'global/utils'
import { redisClient } from 'infra/redis/usecase'
import config from 'config'
import {
  articleRouter,
  authRouter,
  rootRouter,
  taskCardRouter,
  taskRouter,
  uploadRouter,
  userRouter,
} from 'router'

const RedisStore = connectRedis(session)

const whitelist = ['http://localhost:3000', 'http://localhost:5001']
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

  /**
   * 정적 파일 제공, 정적파일 접근은 cors whitelist 적용 X
   */
  app.use(
    STATIC_UPLOAD_FOLDER_PATH,
    express.static(path.join(__dirname, getRelativePathOfProjectRootPath(__dirname), 'uploads'))
  )
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

  /**
   * query string type parsing
   */
  app.use((req, res, next) => {
    if (Object.keys(req.query).length) {
      req.query = Object.entries(req.query).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]:
            value === 'true' || value === 'false'
              ? JSON.parse(value)
              : !isNaN(Number(value))
              ? Number(value)
              : value,
        }),
        {}
      )
    }

    next()
  })

  /**
   * @swagger
   * tags:
   *  - name: auth
   *    description: 사용자 인증
   *  - name: user
   *    description: 사용자
   *  - name: article
   *    description: 아티클
   *  - name: upload
   *    description: 파일 업로드
   *  - name: task-card
   *    description: 태스크 카드
   *  - name: task
   *    description: 태스크
   * components:
   *  schemas:
   */
  app.use('/', rootRouter)
  app.use('/auth', authRouter)
  app.use('/users', userRouter)
  app.use('/article', articleRouter)
  app.use('/upload', uploadRouter)
  app.use('/task-card', taskCardRouter)
  app.use('/task', taskRouter)
}

export default expressLoader
