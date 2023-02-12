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

export const postTask = async (data: Pick<Task, 'content' | 'task_card_id' | 'parent_task_id'>) => {
  try {
    const response = await API.post<{ task: Task }>(`/task`, data)
    return response?.data
  } catch (err) {
    throw err
  }
}

export const postTaskCard = async (data: Pick<TaskCard, 'name' | 'description'>) => {
  try {
    const response = await API.post<{ taskCard: TaskCard }>('/task-card', data)
    return response?.data
  } catch (err) {
    throw err
  }
}

export const patchTask = async ({
  id,
  body,
}: {
  id: number
  body: Partial<
    Pick<Task, 'content' | 'date' | 'time' | 'completed_at' | 'task_card_id' | 'parent_task_id'>
  >
}) => {
  try {
    const response = await API.patch<{ task: Task }>(`/task/${id}`, body)
    return response?.data
  } catch (err) {
    throw err
  }
}
