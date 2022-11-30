import { DataType, validator } from './index'

const taskValidator = {
  create: validator('body', {
    content: {
      required: true,
      type: DataType.string,
      length: {
        min: 1,
        max: 200,
      },
    },
    task_card_id: {
      required: true,
      type: DataType.number,
    },
    parent_task_id: {
      type: DataType.number,
    },
  }),

  update: validator('body', {
    content: {
      type: DataType.string,
      length: {
        min: 1,
        max: 200,
      },
    },
    task_card_id: {
      type: DataType.number,
    },
    parent_task_id: {
      type: DataType.number,
    },
    completed_at: {
      type: DataType.date,
    },
  }),
}

export default taskValidator
