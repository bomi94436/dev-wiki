import express from 'express'
import { AuthController } from 'controller'
import { asyncMiddleware } from 'global/utils'
import authValidator from 'middleware/vaildator/auth.validator'

const authRouter = express.Router()
const authController = new AuthController()

authRouter.post('/signup', authValidator.signup, asyncMiddleware(authController.signup))

/**
 * @swagger
 * paths:
 *  /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: 로그인
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        '200':
 *          description: 로그인 성공
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
authRouter.post('/login', asyncMiddleware(authController.login))

authRouter.post('/logout', asyncMiddleware(authController.logout))

export default authRouter
