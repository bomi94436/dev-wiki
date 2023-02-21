import express from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import { serve, setup } from 'swagger-ui-express'

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Dev Wiki',
      version: '1.0.0',
      description: 'product API with express',
    },
  },
  apis: ['src/**/*.entity.ts'],
}

const swaggerLoader = ({ app }: { app: express.Express }) => {
  const specs = swaggerJSDoc(options)
  app.use('/api-docs', serve, setup(specs))
}

export default swaggerLoader
