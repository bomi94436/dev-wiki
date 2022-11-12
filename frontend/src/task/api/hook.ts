import { useQuery } from 'react-query'
import { getTaskCards } from './funcs'

export const useTaskCards = () => {
  const { data, isLoading, refetch } = useQuery(['task-cards'], getTaskCards)

  return {
    taskCards: data?.task_cards,
    isLoading,
    refetch,
  }
}
