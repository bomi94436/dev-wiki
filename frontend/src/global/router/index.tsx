import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Signup, Login } from '@/auth'
import { PageLayout } from '@/global/ui'

const PageRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<>home</>} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default PageRouter
