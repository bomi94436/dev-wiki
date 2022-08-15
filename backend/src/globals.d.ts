declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    MYSQL_DB_ROOT_PASSWORD?: string

    MYSQL_DB_HOST: string
    MYSQL_DB_PORT: string
    MYSQL_DB_USER: string
    MYSQL_DB_PASSWORD: string

    REDIS_DB_HOST: string
    REDIS_DB_PORT: string
  }
}
