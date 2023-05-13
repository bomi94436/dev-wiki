import { useQuery } from 'react-query'
import { getArticle, getArticles } from './funcs'

export const useArticles = () => {
  const { data, isLoading, refetch } = useQuery(['articles'], getArticles)

  return { articles: data?.items, isLoading, refetch }
}

export const useArticle = ({ id }: { id: number | null }) => {
  const {
    data: article,
    isLoading,
    refetch,
  } = useQuery(['article', id], () => getArticle(Number(id)), {
    enabled: !!id,
  })

  return {
    article,
    isLoading,
    refetch,
  }
}
