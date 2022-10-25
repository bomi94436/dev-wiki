import { DataRegExp, DataType, validator } from './index'

const authValidator = {
  signup: validator('body', {
    email: {
      type: DataType.string,
      required: true,
      length: {
        min: 8,
        max: 50,
      },
      regexp: DataRegExp.email,
    },
    password: {
      type: DataType.string,
      required: true,
      length: {
        min: 8,
        max: 30,
      },
      regexp: DataRegExp.password,
    },
    nickname: {
      type: DataType.string,
      required: true,
      length: {
        min: 3,
        max: 20,
      },
      regexp: DataRegExp.nickname,
    },
  }),
}

export default authValidator
