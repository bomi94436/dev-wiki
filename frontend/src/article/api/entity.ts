import { Series } from '@/global/api/entity'

export interface Article {
  id: number
  title: string
  content: string
  thumbnail?: string
  short_description?: string
  created_by_id: string
  created_at: string // timestamp
  updated_at?: string // timestamp
  series?: Series
  series_id?: number
}
