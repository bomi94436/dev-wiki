import dotenv from 'dotenv'
import path from 'path'

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '../..', '/.env.production') })
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '../..', '/.env.development') })
} else {
  dotenv.config({ path: path.join(__dirname, '../..', '/.env.local') })
}

const config = {
  mysql: {
    host: process.env.MYSQL_DB_HOST,
    port: Number(process.env.MYSQL_DB_PORT),
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
  },
  redis: {
    host: process.env.REDIS_DB_HOST,
    port: process.env.REDIS_DB_PORT,
  },
}

export default config
