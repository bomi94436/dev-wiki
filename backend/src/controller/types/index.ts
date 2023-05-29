import { PaginationResult, Result } from 'global/type'

export interface FailResponse {
  message?: string
}

export type ItemResponse<T> = T | FailResponse

export type ItemsResponse<T> = Result<T> | PaginationResult<T> | FailResponse
