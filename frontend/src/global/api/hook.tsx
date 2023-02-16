import { useQuery } from 'react-query'
import API from '.'
import { User } from './entity'

export const useUserInfo = () => {
  const {
    data: response,
    refetch,
    remove,
    isFetching,
  } = useQuery(['me'], () => API.get<{ user?: User }>('/users/me'), {
    staleTime: 1000 * 60,
    retry: 0,
  })

  return {
    user: response?.data?.user,
    isFetching,
    refetch,
    remove,
  }
}
