import { DataType, validator } from './index'

const seriesValidator = {
  create: validator('body', {
    name: {
      type: DataType.string,
      required: true,
      length: {
        min: 1,
        max: 100,
      },
    },
  }),
}

export default seriesValidator
