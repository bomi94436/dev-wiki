import { useState } from 'react'
import { useQuery } from 'react-query'
import API from '../api'
import { User } from '../entity'

export const useUserInfo = () => {
  const [data, setData] = useState<User | null>(null)

  const { refetch, isFetching } = useQuery(['me'], () => API.get<{ user: User }>('/users/me'), {
    staleTime: 1000 * 60,
    retry: 0,
    onSuccess: (res) => {
      setData(res?.data?.user || null)
    },
    onError: () => {
      setData(null)
    },
  })

  return {
    user: data,
    isFetching,
    refetch,
  }
}
