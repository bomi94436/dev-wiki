import { DataType, validator } from './index'
import { CreateTaskDTO, UpdateTaskDTO } from 'types/task.dto'

const taskValidator = {
  create: validator<CreateTaskDTO>('body', {
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

  update: validator<UpdateTaskDTO>('body', {
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
