import * as React from 'react'

import { AppContext } from '@/stores/app'
import AppAction from '@/stores/app/action'

const Mine: React.FC = () => {
  const appStore: any = React.useContext(AppContext)
  console.log(appStore.state.authed)
  const handleAuth = () => {
    appStore.dispatch(AppAction.updateAuth(!appStore.state.authed))
  }
  return <div onClick={handleAuth}>Going Page - {JSON.stringify(appStore.state.authed)}</div>
}

export default Mine
