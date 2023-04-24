import express from 'express'
import path from 'path'
import { serve, setup } from 'swagger-ui-express'
import YAML from 'yamljs'

import { getRelativePathOfProjectRootPath } from 'global/utils'

const swaggerSpec = YAML.load(
  path.join(__dirname, getRelativePathOfProjectRootPath(__dirname), 'build/swagger.yaml')
)

const swaggerLoader = ({ app }: { app: express.Express }) => {
  app.use('/api-docs', serve, setup(swaggerSpec))
}

export default swaggerLoader
