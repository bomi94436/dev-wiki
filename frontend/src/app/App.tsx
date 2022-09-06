import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import './App.less'

import Signup from '@/auth/Signup'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen">
        {/* TODO: router 설정 */}
        <Signup />
      </div>
    </QueryClientProvider>
  )
}

export default App
