import { useQuery } from 'react-query'
import API from '.'
import { Series, User } from './entity'

export const useUserInfo = () => {
  const {
    data: response,
    refetch,
    remove,
    isFetching,
  } = useQuery(['me'], () => API.get<User>('/user/me'), {
    staleTime: 1000 * 60,
    retry: 0,
  })

  return {
    user: response?.data,
    isFetching,
    refetch,
    remove,
  }
}

export const useSeriesList = () => {
  const {
    data: response,
    refetch,
    remove,
    isFetching,
  } = useQuery(['series-list'], () => API.get<{ items: Series[] }>('/series'), {
    staleTime: 1000 * 60,
    retry: 0,
  })

  return {
    seriesList: response?.data,
    isFetching,
    refetch,
    remove,
  }
}
