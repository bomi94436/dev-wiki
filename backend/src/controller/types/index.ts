export interface FailResponse {
  message?: string
}

export type ItemResponse<T> = T | FailResponse

// TODO: pagination 정보 추가
export type ItemsResponse<T> = { items: T[] } | FailResponse
