export interface User {
  id: string
  nickname: string
  email: string
}

export interface Article {
  id: number
  title: string
  content: string
  writer_id: string
  next_article_id: string | null
  created_at: string // timestamp
}
