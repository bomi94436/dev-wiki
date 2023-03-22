export interface FailResponse {
  message?: string
}

export type Response<T> = T | FailResponse

// TODO: pagination 정보 추가
export type ItemsResponse<T> = Response<{ items: T[] }>
