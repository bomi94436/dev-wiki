import { DataRegExp, DataType, validator } from './index'

const articleValidator = {
  create: validator('body', {
    title: {
      type: DataType.string,
      required: true,
      length: {
        min: 1,
        max: 100,
      },
    },
    content: {
      type: DataType.string,
      required: true,
      length: {
        min: 1,
      },
    },
  }),
}

export default articleValidator
