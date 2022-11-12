import React from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'

import RouteOption from './RouteOption'

import { Login, Signup } from '@/auth'
import { ArticleDetail, ArticleEditor, ArticleList } from '@/article'
import { TaskList } from '@/task'

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
          </Route>

          <Route
            path="task"
            element={
              <RouteOption isAuthenticated>
                <Outlet />
              </RouteOption>
            }
          >
            <Route index element={<TaskList />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default PageRouter
