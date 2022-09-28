import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import PageRouter from './router'
import { ThemeProvider } from '@mui/material'
import theme from './theme'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="w-screen h-screen">
          <PageRouter />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
