import { AxiosError } from 'axios'

import API from '@/global/api'
import { Article } from './entity'

export const postArticle = async ({
  title,
  content,
  thumbnail,
  short_description,
}: {
  title: string
  content: string
  thumbnail: string | null
  short_description: string | null
}) => {
  try {
    const response = await API.post<{ article: Article }>('/article', {
      title,
      content,
      thumbnail,
      short_description,
    })
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

export interface PatchArticleParams {
  id: number
  body: Partial<Pick<Article, 'title' | 'content' | 'thumbnail' | 'short_description'>>
}

export const patchArticle = async ({ id, body }: PatchArticleParams) => {
  try {
    const response = await API.patch<{ article: Article }>(`/article/${id}`, body)
    return response.data.article
  } catch (err) {
    throw err as AxiosError
  }
}

export const deleteArticle = async (id: number) => {
  try {
    await API.delete(`/article/${id}`)
  } catch (err) {
    throw err as AxiosError
  }
}
