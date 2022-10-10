import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Login from '@/auth/Login'
import Signup from '@/auth/Signup'
import RouteOption from './RouteOption'
import ArticleEditor from '@/article/ArticleEditor'
import ArticleList from '@/article/ArticleList'

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <RouteOption isAuthenticated>
                <>home</>
              </RouteOption>
            }
          />

          <Route path="auth">
            <Route
              path="login"
              element={
                <RouteOption withoutLayout isAuthenticated={false}>
                  <Login />
                </RouteOption>
              }
            />
            <Route
              path="signup"
              element={
                <RouteOption withoutLayout isAuthenticated={false}>
                  <Signup />
                </RouteOption>
              }
            />
          </Route>

          <Route path="article">
            <Route
              index
              element={
                <RouteOption isAuthenticated>
                  <ArticleList />
                </RouteOption>
              }
            />
            <Route
              path="write"
              element={
                <RouteOption isAuthenticated>
                  <ArticleEditor />
                </RouteOption>
              }
            />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PageRouter
