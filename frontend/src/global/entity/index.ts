export interface User {
  id: string
  nickname: string
  email: string
}

export interface Article {
  id: number
  title: string
  content: string
  thumbnail?: string
  short_description?: string
  writer_id: string
  created_at: string // timestamp
  updated_at: string // timestamp
}
