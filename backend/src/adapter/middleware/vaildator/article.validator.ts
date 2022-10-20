import { DataType, validator } from './index'

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
    thumbnail: {
      type: DataType.string,
      length: {
        max: 2000,
      },
    },
    short_description: {
      type: DataType.string,
      length: {
        max: 150,
      },
    },
  }),

  update: validator('body', {
    title: {
      type: DataType.string,
      length: {
        min: 1,
        max: 100,
      },
    },
    content: {
      type: DataType.string,
      length: {
        min: 1,
      },
    },
    thumbnail: {
      type: DataType.string,
      length: {
        max: 2000,
      },
    },
    short_description: {
      type: DataType.string,
      length: {
        max: 150,
      },
    },
  }),
}

export default articleValidator
