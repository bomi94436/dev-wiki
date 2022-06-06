import dotenv from 'dotenv'
import path from 'path'

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '../..', '/.env.production') })
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '../..', '/.env.development') })
} else {
  throw new Error('process.env.NODE_ENV 를 설정하지 않았습니다!')
}

const config = {
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
}

export default config
