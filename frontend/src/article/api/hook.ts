import { useQuery } from 'react-query'
import { getArticle, getArticles } from './funcs'
import { Article } from './entity'

export const useArticles = () => {
  const { data, isLoading, refetch } = useQuery(['articles'], getArticles)

  return { articles: data?.items, isLoading, refetch }
}

export const useArticle = ({
  id,
  onSuccess,
}: {
  id: number | null
  onSuccess?: (data: Article) => void
}) => {
  const {
    data: article,
    isLoading,
    refetch,
  } = useQuery(['article', id], () => getArticle(Number(id)), {
    enabled: !!id,
    onSuccess,
  })

  return {
    article,
    isLoading,
    refetch,
  }
}
