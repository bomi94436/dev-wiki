import React from 'react'
import { useUserInfo } from '../hook'
import { Navigate } from 'react-router-dom'

interface UnauthenticatedRouteProps {
  children: JSX.Element
}

const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = ({ children }) => {
  const { user, isFetching } = useUserInfo()

  if (!isFetching && user) {
    return <Navigate to="/" />
  } else {
    return <>{children}</>
  }
}

export default UnauthenticatedRoute
