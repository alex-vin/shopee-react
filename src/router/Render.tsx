import React from 'react'
import { Switch } from 'react-router-dom'
import { RouteInterface } from '@/types/route'
import { RouteWithSubRoutes } from './SubRender'
import NoMatch from '@/pages/404/404'

export const RenderRoutes = (routes: RouteInterface[], authed: boolean, authPath = '/login') => {
  if (routes) {
    return (
      <Switch>
        {routes.map((route: RouteInterface, i) => {
          return RouteWithSubRoutes(route, i, authed, authPath)
        })}
      </Switch>
    )
  } else {
    return NoMatch
  }
}
