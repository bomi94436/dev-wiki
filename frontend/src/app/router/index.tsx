import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import RouteOption from './RouteOption'

import { Login, Signup } from '@/auth'
import { ArticleDetail, ArticleEditor, ArticleList } from '@/article'
import { TaskCardKanban, TaskCardList } from '@/task'
import SeriesList from '@/series'

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            path="auth"
            element={
              <RouteOption withoutLayout isAuthenticated={false}>
                <Outlet />
              </RouteOption>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          <Route
            index
            element={
              <RouteOption isAuthenticated>
                <>home</>
              </RouteOption>
            }
          />

          <Route
            path="article"
            element={
              <RouteOption isAuthenticated>
                <Outlet />
              </RouteOption>
            }
          >
            <Route index element={<ArticleList />} />
            <Route path="write" element={<ArticleEditor />} />
            <Route path=":id" element={<ArticleDetail />} />
            <Route path="series" element={<SeriesList />} />
          </Route>

          <Route
            path="task"
            element={
              <RouteOption isAuthenticated>
                <Outlet />
              </RouteOption>
            }
          >
            <Route path="list" element={<TaskCardList />} />
            <Route path="kanban" element={<TaskCardKanban />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default PageRouter
