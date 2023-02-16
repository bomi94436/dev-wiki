import { useQuery } from 'react-query'
import { getTaskCards, getTasks } from './funcs'

export const useTaskCards = () => {
  const { data, isLoading, refetch } = useQuery(['task-cards'], getTaskCards)

  return {
    taskCards: data?.task_cards,
    isLoading,
    refetch,
  }
}

export const useTasks = ({ taskCardId }: { taskCardId?: number }) => {
  const { data, isLoading, refetch } = useQuery(
    ['tasks'],
    () => getTasks({ taskCardId: taskCardId! }),
    {
      enabled: !!taskCardId,
    }
  )

  return {
    tasks: data?.tasks,
    isLoading,
    refetch,
  }
}
