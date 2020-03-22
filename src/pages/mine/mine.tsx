import * as React from 'react'
import { routeProps } from '@/types/route'

import { useCommonRedux } from '@/stores/common'
import { initState } from '@/stores'

const Mine: React.FC<routeProps> = (routeProps: routeProps) => {
  const { state, dispatch } = useCommonRedux<typeof initState>()

  const handleClick = () => {
    const authed = !state.appStore.authed
    dispatch({ type: 'APP_AUTHED', data: authed })
    console.log(state, authed, routeProps)
    // routeProps.history.push('/home/going')
  }
  return <div onClick={handleClick}>Mine Page - {JSON.stringify(state)}</div>
}

export default Mine
