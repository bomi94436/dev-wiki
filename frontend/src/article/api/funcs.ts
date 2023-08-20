import { AxiosError } from 'axios'

import API from '@/global/api'
import { Article } from './entity'

export const postArticle = async ({
  title,
  content,
  thumbnail,
  short_description,
}: Pick<Article, 'title' | 'content' | 'thumbnail' | 'short_description'>) => {
  try {
    const response = await API.post<Article>('/article', {
      title,
      content,
      thumbnail,
      short_description,
    })
    return response?.data
  } catch (err) {
    throw err as AxiosError
  }
}

export const getArticles = async (params: {
  title?: string
  content?: string
  short_description?: string
  series_id?: number
  page?: number
  page_size?: number
}) => {
  try {
    const response = await API.get<{ items: Article[] }>('/article', { params })
    return response?.data
  } catch (err) {
    throw err as AxiosError
  }
}

export const getArticle = async (id: number): Promise<Article> => {
  try {
    const response = await API.get<Article>(`/article/${id}`)
    return response?.data
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
    const response = await API.patch<Article>(`/article/${id}`, body)
    return response?.data
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
