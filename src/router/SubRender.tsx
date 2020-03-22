import React from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'
import { RouteInterface } from '@/types/route'

export const RouteWithSubRoutes = (
  route: RouteInterface,
  i: number,
  authed: boolean,
  authPath: string
) => {
  return (
    <Route
      key={i}
      path={route.path}
      exact={route.exact}
      render={(props: RouteComponentProps) => {
        console.log(route.path, !route.auth, authed, route.path === authPath)
        if (!route.auth || authed || route.path === authPath) {
          console.log('done')
          return <route.component {...props} routes={route.routes} />
        }
        return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />
      }}
    />
  )
}
