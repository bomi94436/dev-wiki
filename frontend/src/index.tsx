import React from 'react'
import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

import App from './app/App'
import './index.css'
import theme from './theme'

const queryClient = new QueryClient()

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </QueryClientProvider>
)
