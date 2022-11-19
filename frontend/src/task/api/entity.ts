export interface TaskCard {
  id: number
  name: string
  description?: string
  is_closed: boolean
  task_count: number
}

export interface Task {
  id: number
  content: string
  date: string | null // YYYY-MM-DD
  time: string | null // HH:MM:SS
  completed_at: string | null // timestamp
  created_at: string | null // timestamp
  task_card_id: number
  parent_task_id: number | null
  sub_tasks?: (Omit<Task, 'parent_task_id'> & { parent_task_id: number })[]
}
