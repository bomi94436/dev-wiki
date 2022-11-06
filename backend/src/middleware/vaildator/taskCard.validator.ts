import { DataType, validator } from './index'

const taskCardValidator = {
  create: validator('body', {
    name: {
      type: DataType.string,
      required: true,
      length: {
        min: 1,
        max: 200,
      },
    },
    description: {
      type: DataType.string,
      length: {
        min: 0,
        max: 500,
      },
    },
    is_closed: {
      type: DataType.boolean,
    },
  }),

  update: validator('body', {
    name: {
      type: DataType.string,
      length: {
        min: 1,
        max: 200,
      },
    },
    description: {
      type: DataType.string,
      length: {
        min: 0,
        max: 500,
      },
    },
    is_closed: {
      type: DataType.boolean,
    },
  }),
}

export default taskCardValidator
