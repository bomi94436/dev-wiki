import API from '@/global/api'
import { Task, TaskCard } from './entity'

export const getTaskCards = async () => {
  try {
    const response = await API.get<{ task_cards: TaskCard[] }>('/task-card')
    return response?.data
  } catch (err) {
    throw err
  }
}

export const getTasks = async ({ taskCardId }: { taskCardId: number }) => {
  try {
    const response = await API.get<{ tasks: Task[] }>(`/task-card/${taskCardId}/task`)
    return response?.data
  } catch (err) {
    throw err
  }
}
