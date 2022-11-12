import API from '@/global/api'
import { TaskCard } from './entity'

export const getTaskCards = async () => {
  try {
    const response = await API.get<{ task_cards: TaskCard[] }>('/task-card')
    return response?.data
  } catch (err) {
    throw err
  }
}
