import React from 'react'
import PageLayout from '../Layout'
import AuthenticatedRoute from './AuthenticatedRoute'
import UnauthenticatedRoute from './UnauthenticatedRoute'

type RouteOptionProps = {
  isAuthenticated?: boolean
  withoutLayout?: boolean
  children: JSX.Element
}

const RouteOption: React.FC<RouteOptionProps> = ({ isAuthenticated, withoutLayout, children }) => {
  let component: JSX.Element = children

  // 레이아웃 적용 여부
  if (!withoutLayout) {
    component = <PageLayout>{component}</PageLayout>
  }

  // 로그인 여부
  if (isAuthenticated === true) {
    component = <AuthenticatedRoute>{component}</AuthenticatedRoute>
  } else if (isAuthenticated === false) {
    component = <UnauthenticatedRoute>{component}</UnauthenticatedRoute>
  }

  return component
}

export default RouteOption
