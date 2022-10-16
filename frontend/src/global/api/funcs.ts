import { AxiosError } from 'axios'

import API from '@/global/api'
import { Article } from '../entity'

export const postArticle = async ({ title, content }: { title: string; content: string }) => {
  try {
    const response = await API.post<{ article: Article }>('/article', { title, content })
    return response.data
  } catch (err) {
    throw err as AxiosError
  }
}

export const getArticles = async (): Promise<Article[]> => {
  try {
    const response = await API.get<{ articles: Article[] }>('/article')
    return response.data.articles
  } catch (err) {
    throw err as AxiosError
  }
}

export const getArticle = async (id: number): Promise<Article> => {
  try {
    const response = await API.get<{ article: Article }>(`/article/${id}`)
    return response.data.article
  } catch (err) {
    throw err as AxiosError
  }
}
