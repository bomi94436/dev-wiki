import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Signup, Login } from '@/auth'
import RouteOption from './RouteOption'

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <RouteOption withLayout isAuthenticated>
                <>home</>
              </RouteOption>
            }
          />
          <Route
            path="signup"
            element={
              <RouteOption isAuthenticated={false}>
                <Signup />
              </RouteOption>
            }
          />
          <Route
            path="login"
            element={
              <RouteOption isAuthenticated={false}>
                <Login />
              </RouteOption>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PageRouter
