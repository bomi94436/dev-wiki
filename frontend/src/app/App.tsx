import React from 'react'

import PageRouter from './router'
import useSnackbar from '@/global/hook/useSnackbar'

const App = () => {
  const { CustomSnackbar } = useSnackbar()

  return (
    <div className="w-screen h-screen">
      <CustomSnackbar />

      <PageRouter />
    </div>
  )
}

export default App
