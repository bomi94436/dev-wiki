import { RequestHandler } from 'express'
import { SelectQueryBuilder } from 'typeorm'
import path from 'path'
import { PaginationResult } from './type'

export const asyncMiddleware =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

export class CustomError extends Error {
  constructor(public status: number = 500, ...params: any) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
  }
}

export const getProjectRootPath = (dirname: string) => dirname.slice(0, dirname.lastIndexOf('/src'))

export const getRelativePathOfProjectRootPath = (dirname: string) =>
  path.relative(dirname, getProjectRootPath(dirname))

/**
 * typeorm SelectQueryBuilder를 이용해 리스트 데이터를 페이징하는 함수
 */
export const paginate = async <T>({
  query,
  page,
  page_size = 10,
}: {
  query: SelectQueryBuilder<T>
  page: number
  page_size?: number
}): Promise<PaginationResult<T>> => {
  if (page_size > 100 || page_size < 1) {
    page_size = 10
  }

  const skip = (page - 1) * page_size
  const total = await query.getCount()
  const last_page = total % page_size
  const pages = last_page === 0 ? total / page_size : Math.trunc(total / page_size) + 1
  const items = await query.skip(skip).take(page_size).getMany()

  return {
    prev_page: page > 1 ? page - 1 : null,
    next_page: total > skip + page_size ? page + 1 : null,
    total,
    pages,
    page,
    page_size,
    items,
  }
}
