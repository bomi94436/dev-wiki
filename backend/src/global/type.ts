export type DateString = `${number}${number}${number}${number}-${number | ''}${number}-${
  | number
  | ''}${number}`

export type TimeString = `${number | ''}${number}:${number | ''}${number}:${number | ''}${number}`

export type PageParam =
  | {
      page?: number
      page_size?: number
    }
  | undefined

export type Result<T> = {
  items: T[]
}

export type PaginationResult<T> = Result<T> & {
  prev_page: number | null
  next_page: number | null
  total: number
  pages: number
  page: number
  page_size: number
}
