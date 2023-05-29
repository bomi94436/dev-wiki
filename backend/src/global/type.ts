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

/**
 * 페이징된 리스트 데이터
 *
 * @param prev_page 이전 페이지
 * @param next_page 다음 페이지
 * @param total 리스트 데이터의 전체 개수
 * @param pages 전체 페이지 번호
 * @param page 현재 페이지 번호
 * @param page_size 페이지 크기
 */
export type PaginationResult<T> = Result<T> & {
  prev_page: number | null
  next_page: number | null
  total: number
  pages: number
  page: number
  page_size: number
}
