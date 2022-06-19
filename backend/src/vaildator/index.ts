import { RequestHandler } from 'express'
import { CustomError } from '../utils'

export const DataType = {
  number: 'Number',
  string: 'String',
  boolean: 'Boolean',
  date: 'Date',
} as const

type DataRegExpKeys = 'email' | 'password' | 'nickname'

export const DataRegExp: {
  [key in DataRegExpKeys]: RegExp
} = {
  email:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
  nickname: /^([가-힣ㄱ-ㅎa-zA-Z0-9._])+$/,
} as const

export const validateDataType = {
  isNumber: (data: any) => typeof data === 'number',
  isString: (data: any) => typeof data === 'string',
  isBoolean: (data: any) => typeof data === 'boolean',
  isDate: (data: any) => Boolean(Date.parse(data)),
}

export const validator =
  (
    property: 'body' | 'params',
    options: {
      [field: string]: {
        type: typeof DataType[keyof typeof DataType]
        required?: Boolean
        length?: {
          min?: number
          max?: number
        }
        regexp?: typeof DataRegExp[keyof typeof DataRegExp]
      }
    }
  ): RequestHandler =>
  (req, res, next) => {
    Object.entries(options).forEach(([field, option]) => {
      const data = req[property][field]

      if (!validateDataType[`is${option.type}`](data)) {
        throw new CustomError(
          422,
          `${field} must be a ${option.type.toLocaleLowerCase()}`
        )
      }

      if (option.required && !data) {
        throw new CustomError(422, `${field} is required in ${property}`)
      }

      if (option.length?.min) {
        if (
          (option.type === 'Number' && data < option.length.min) ||
          (option.type === 'String' && data.length < option.length.min)
        ) {
          throw new CustomError(
            422,
            `${field} must be greater than ${option.length.min}`
          )
        }
      }

      if (option.length?.max) {
        if (
          (option.type === 'Number' && data > option.length.max) ||
          (option.type === 'String' && data.length > option.length.max)
        ) {
          throw new CustomError(
            422,
            `${field} must be less than ${option.length.max}`
          )
        }
      }

      if (option.regexp && !data.match(option.regexp)) {
        throw new CustomError(
          422,
          `${field} must fit the following pattern: ${option.regexp}`
        )
      }
    })

    next()
  }
