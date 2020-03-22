import * as React from 'react'
import { routeProps } from '@/types/route'
import { RenderRoutes } from '@/router/Render'

import provider, { useCommonRedux } from '@/stores/common'
import { reducer, initState } from '@/stores'

const Home: React.FC<any> = (routeProps: routeProps) => {
  // console.log(routeProps)
  const authed = true
  const { routes } = routeProps

  const { state } = useCommonRedux<typeof initState>()

  return routes ? (
    <div className="base-wrap">
      <div>Header - {JSON.stringify(state.appStore.authed)}</div>
      <div>{RenderRoutes(routes, authed)}</div>
      <div>footer</div>
    </div>
  ) : null
}

export default provider(reducer, initState)(Home)
