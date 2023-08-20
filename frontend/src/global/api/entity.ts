export interface User {
  id: string
  nickname: string
  email: string
}

export interface Series {
  id: number
  name: string
  created_by_id: string
  created_at: string // timestamp
  updated_at?: string // timestamp
}
