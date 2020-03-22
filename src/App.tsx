import React, { useReducer, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { routes } from '@/router/router'
import { RenderRoutes } from '@/router/Render'
import '@/App.less'

import { AppContext } from '@/stores/app'
import { appIniState, appReducer } from '@/stores/app/reducer'

// 是否具有权限，从状态管理或context中获取
const authed = true
const authPath = '/login'

const App: React.FC = () => {
  const [appState, appAction] = useReducer<any>(appReducer, appIniState)
  return (
    <AppContext.Provider value={{ state: appState, dispatch: appAction }}>
      <BrowserRouter>{RenderRoutes(routes, authed, authPath)}</BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
