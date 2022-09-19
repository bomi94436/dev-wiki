import React from 'react'
import { IndexRouteProps, LayoutRouteProps, PathRouteProps, Route } from 'react-router-dom'
import { PageLayout } from '../ui'
import AuthenticatedRoute from './AuthenticatedRoute'
import UnauthenticatedRoute from './UnauthenticatedRoute'

type RouteOptionProps = {
  isAuthenticated?: boolean
  withLayout?: boolean
  children: JSX.Element
}

const RouteOption: React.FC<RouteOptionProps> = ({ isAuthenticated, withLayout, children }) => {
  let component: JSX.Element = children

  // 레이아웃 적용 여부
  if (withLayout) {
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
