import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserInfo } from '../hook'

interface AuthenticatedRouteProps {
  children: JSX.Element
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ children }) => {
  const { user, isFetching } = useUserInfo()

  if (!isFetching && !user) {
    return <Navigate to="/login" />
  } else {
    return <>{children}</>
  }
}

export default AuthenticatedRoute
